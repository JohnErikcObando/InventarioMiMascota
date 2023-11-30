-- FUNCTION: public.t_abono_factura_venta_historial()

-- DROP FUNCTION IF EXISTS public.t_abono_factura_venta_historial();

CREATE OR REPLACE FUNCTION public.t_abono_factura_venta_historial()
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
    modulo := 'Abono Factura Venta';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nuevo Abono';
        nuevo := '';
        anterior := '';
        accion := 'Ingreso';
        CALL  p_ingresar_historial(NEW.usuario_modif, campo, modulo, NEW.id::TEXT, nuevo, anterior, accion);
    ELSIF TG_OP = 'UPDATE' THEN
        accion := 'Actualizar';
        
        -- Verificar cada campo individualmente y registrar cambios
        IF NEW.forma_pago_id <> OLD.forma_pago_id THEN
            campo := 'formaPagoId';
            nuevo := NEW.forma_pago_id::TEXT;
            anterior := OLD.forma_pago_id::TEXT;
            CALL  p_ingresar_historial(NEW.usuario_modif, campo, modulo, NEW.id::TEXT, nuevo, anterior, accion);
        END IF;

        IF NEW.fecha <> OLD.fecha THEN
            campo := 'fecha';
            nuevo := NEW.fecha::TEXT;
            anterior := OLD.fecha::TEXT;
            CALL  p_ingresar_historial(NEW.usuario_modif, campo, modulo, NEW.id::TEXT, nuevo, anterior, accion);
        END IF;

        IF NEW.valor <> OLD.valor THEN
            campo := 'valor';
            nuevo := NEW.valor::TEXT;
            anterior := OLD.valor::TEXT;
            CALL p_ingresar_historial(NEW.usuario_modif, campo, modulo, NEW.id::TEXT, nuevo, anterior, accion);
        END IF;

        IF NEW.descripcion <> OLD.descripcion THEN
            campo := 'descripcion';
            nuevo := NEW.descripcion;
            anterior := OLD.descripcion;
            CALL  p_ingresar_historial(NEW.usuario_modif, campo, modulo, NEW.id::TEXT, nuevo, anterior, accion);
        END IF;
		
		IF NEW.anulado <> OLD.anulado THEN
            campo := 'anulado';
            nuevo := NEW.anulado;
            anterior := OLD.anulado;
            CALL  p_ingresar_historial(NEW.usuario_modif, campo, modulo, NEW.id::TEXT, nuevo, anterior, accion);
        END IF;

    ELSIF TG_OP = 'DELETE' THEN
        campo := 'Eliminar Abono';
        nuevo := '';
        anterior := '';
        accion := 'Eliminar';
        -- Registra la eliminación
        CALL  p_ingresar_historial(OLD.usuario_modif, campo, modulo, OLD.id::TEXT, nuevo, anterior, accion);
    END IF;

    RETURN NULL;
END;
$BODY$;

ALTER FUNCTION public.t_abono_factura_venta_historial()
    OWNER TO "MiMascota";



-- Trigger: t_abono_factura_venta_historial

-- DROP TRIGGER IF EXISTS t_abono_factura_venta_historial ON public.abonos_factura_venta;

CREATE OR REPLACE TRIGGER t_abono_factura_venta_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.abonos_factura_venta
    FOR EACH ROW
    EXECUTE FUNCTION public.t_abono_factura_venta_historial();


