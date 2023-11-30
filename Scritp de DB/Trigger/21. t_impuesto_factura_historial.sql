-- FUNCTION: public.t_impuesto_factura_historial()

-- DROP FUNCTION IF EXISTS public.t_impuesto_factura_historial();

CREATE OR REPLACE FUNCTION public.t_impuesto_factura_historial()
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
    modulo := 'ImpuestoFactura';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nueva Asociación Impuesto-Factura';
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
            nuevo := NEW.factura_venta_id;
            anterior := OLD.factura_venta_id;
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
		
		 IF NEW.impuesto_id <> OLD.impuesto_id THEN
            campo := 'impuesto_id';
            nuevo := NEW.impuesto_id;
            anterior := OLD.impuesto_id;
            CALL p_ingresar_historial(
                NEW.impuesto_id,
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
            nuevo := NEW.valor;
            anterior := OLD.valor;
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
        campo := 'Eliminar Asociación Impuesto-Factura';
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

ALTER FUNCTION public.t_impuesto_factura_historial()
    OWNER TO "MiMascota";


-- Trigger: t_impuesto_factura_historial

-- DROP TRIGGER IF EXISTS t_impuesto_factura_historial ON public.impuesto_facturas;

CREATE OR REPLACE TRIGGER t_impuesto_factura_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.impuesto_facturas
    FOR EACH ROW
    EXECUTE FUNCTION public.t_impuesto_factura_historial();