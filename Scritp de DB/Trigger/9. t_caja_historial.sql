
-- FUNCTION: public.t_caja_historial()

-- DROP FUNCTION IF EXISTS public.t_caja_historial();

CREATE OR REPLACE FUNCTION public.t_caja_historial()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
    campo VARCHAR;
    nuevo VARCHAR;
    anterior VARCHAR;
    modulo VARCHAR;
    accion VARCHAR;
BEGIN
    modulo := 'Caja';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nueva Caja';
        nuevo := NEW.nombre;
        anterior := '';
        accion := 'Ingreso';
        CALL p_ingresar_historial(
            NEW.usuario_modif,
            campo,
            modulo,
            NEW.id::TEXT,
            nuevo,
            anterior,
            accion
        );
    ELSIF TG_OP = 'UPDATE' THEN
        accion := 'Actualizar';

        -- Verificar cada campo individualmente y registrar cambios
        IF NEW.nombre <> OLD.nombre THEN
            campo := 'nombre';
            nuevo := NEW.nombre;
            anterior := OLD.nombre;
            CALL p_ingresar_historial(
                NEW.usuario_modif,
                campo,
                modulo,
                NEW.id::TEXT, 
                nuevo,
                anterior,
                accion
            );
        END IF;

        IF NEW.num_factura <> OLD.num_factura THEN
            campo := 'numFactura';
            nuevo := NEW.num_factura::TEXT;
            anterior := OLD.num_factura::TEXT;
            CALL p_ingresar_historial(
                NEW.usuario_modif,
                campo,
                modulo,
                NEW.id::TEXT, 
                nuevo,
                anterior,
                accion
            );
        END IF;

        IF NEW.prefijo <> OLD.prefijo THEN
            campo := 'prefijo';
            nuevo := NEW.prefijo;
            anterior := OLD.prefijo;
            CALL p_ingresar_historial(
                NEW.usuario_modif,
                campo,
                modulo,
                NEW.id::TEXT,
                nuevo,
                anterior,
                accion
            );
        END IF;

        IF NEW.tipo_factura <> OLD.tipo_factura THEN
            campo := 'tipoFactura';
            nuevo := NEW.tipo_factura;
            anterior := OLD.tipo_factura;
            CALL p_ingresar_historial(
                NEW.usuario_modif,
                campo,
                modulo,
                NEW.id::TEXT,
                nuevo,
                anterior,
                accion
            );
        END IF;

    ELSIF TG_OP = 'DELETE' THEN
        campo := 'Eliminar Caja';
        nuevo := '';
        anterior := OLD.nombre;
        accion := 'Eliminar';
        CALL p_ingresar_historial(
            OLD.usuario_modif,
            campo,
            modulo,
            OLD.id::TEXT, 
            nuevo,
            anterior,
            accion
        );
    END IF;

    RETURN NULL;
END;
$BODY$;

ALTER FUNCTION public.t_caja_historial()
    OWNER TO "MiMascota";
 

-- Trigger: t_caja_historial

-- DROP TRIGGER IF EXISTS t_caja_historial ON public.cajas;

CREATE OR REPLACE TRIGGER t_caja_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.cajas
    FOR EACH ROW
    EXECUTE FUNCTION public.t_caja_historial();