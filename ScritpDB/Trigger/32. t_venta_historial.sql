-- FUNCTION: public.t_venta_historial()

-- DROP FUNCTION IF EXISTS public.t_venta_historial();

CREATE OR REPLACE FUNCTION public.t_venta_historial()
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
    modulo := 'Venta';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nueva Venta';
        nuevo := NEW.id::TEXT;
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
		IF NEW.factura_venta_id <> OLD.factura_venta_id THEN
            campo := 'factura_venta_id';
            nuevo := NEW.factura_venta_id::TEXT;
            anterior := OLD.factura_venta_id::TEXT;
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
		
		IF NEW.producto_id <> OLD.producto_id THEN
            campo := 'producto_id';
            nuevo := NEW.producto_id::TEXT;
            anterior := OLD.producto_id::TEXT;
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
		 
        IF NEW.cantidad <> OLD.cantidad THEN
            campo := 'cantidad';
            nuevo := NEW.cantidad::TEXT;
            anterior := OLD.cantidad::TEXT;
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

        IF NEW.valor <> OLD.valor THEN
            campo := 'valor';
            nuevo := NEW.valor::TEXT;
            anterior := OLD.valor::TEXT;
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

        -- Repite este bloque para cada campo que desees rastrear

    ELSIF TG_OP = 'DELETE' THEN
        campo := 'Eliminar Venta';
        nuevo := '';
        anterior := OLD.id::TEXT;
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

ALTER FUNCTION public.t_venta_historial()
    OWNER TO "MiMascota";



-- Trigger: t_venta_historial

-- DROP TRIGGER IF EXISTS t_venta_historial ON public.ventas;

CREATE OR REPLACE TRIGGER t_venta_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.ventas
    FOR EACH ROW
    EXECUTE FUNCTION public.t_venta_historial();