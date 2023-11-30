-- FUNCTION: public.t_compra_historial()

-- DROP FUNCTION IF EXISTS public.t_compra_historial();

CREATE OR REPLACE FUNCTION public.t_compra_historial()
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
    modulo := 'Compra';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nueva Compra';
        nuevo := NEW.factura_compra_id::TEXT;
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
		IF NEW.producto_id <> OLD.producto_id THEN
            campo := 'producto';
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

        IF NEW.costo <> OLD.costo THEN
            campo := 'costo';
            nuevo := NEW.costo::TEXT;
            anterior := OLD.costo::TEXT;
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

        IF NEW.venta <> OLD.venta THEN
            campo := 'venta';
            nuevo := NEW.venta::TEXT;
            anterior := OLD.venta::TEXT;
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

        IF NEW.total <> OLD.total THEN
            campo := 'total';
            nuevo := NEW.total::TEXT;
            anterior := OLD.total::TEXT;
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
        campo := 'Eliminar Compra';
        nuevo := OLD.factura_compra_id::TEXT;
        anterior := '';
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

ALTER FUNCTION public.t_compra_historial()
    OWNER TO "MiMascota";


-- Trigger: t_compra_historial

-- DROP TRIGGER IF EXISTS t_compra_historial ON public.compras;

CREATE OR REPLACE TRIGGER t_compra_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.compras
    FOR EACH ROW
    EXECUTE FUNCTION public.t_compra_historial();
