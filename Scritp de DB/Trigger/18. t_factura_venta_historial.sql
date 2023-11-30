-- FUNCTION: public.t_factura_venta_historial()

-- DROP FUNCTION IF EXISTS public.t_factura_venta_historial();

CREATE OR REPLACE FUNCTION public.t_factura_venta_historial()
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
    modulo := 'Factura Venta';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nueva Factura Venta';
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
        IF NEW.cliente_id <> OLD.cliente_id THEN
            campo := 'clienteId';
            nuevo := NEW.cliente_id;
            anterior := OLD.cliente_id;
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

        IF NEW.caja_id <> OLD.caja_id THEN
            campo := 'cajaId';
            nuevo := NEW.caja_id::TEXT;
            anterior := OLD.caja_id::TEXT;
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

        IF NEW.forma_pago_id <> OLD.forma_pago_id THEN
            campo := 'formaPagoId';
            nuevo := NEW.forma_pago_id::TEXT;
            anterior := OLD.forma_pago_id::TEXT;
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

        IF NEW.movimiento_id <> OLD.movimiento_id THEN
            campo := 'movimientoId';
            nuevo := NEW.movimiento_id::TEXT;
            anterior := OLD.movimiento_id::TEXT;
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

        IF NEW.fecha <> OLD.fecha THEN
            campo := 'fecha';
            nuevo := NEW.fecha::TEXT;
            anterior := OLD.fecha::TEXT;
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

        IF NEW.descuento <> OLD.descuento THEN
            campo := 'descuento';
            nuevo := NEW.descuento::TEXT;
            anterior := OLD.descuento::TEXT;
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

        IF NEW.subtotal <> OLD.subtotal THEN
            campo := 'subtotal';
            nuevo := NEW.subtotal::TEXT;
            anterior := OLD.subtotal::TEXT;
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

        IF NEW.abono <> OLD.abono THEN
            campo := 'abono';
            nuevo := NEW.abono::TEXT;
            anterior := OLD.abono::TEXT;
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

        IF NEW.saldo <> OLD.saldo THEN
            campo := 'saldo';
            nuevo := NEW.saldo::TEXT;
            anterior := OLD.saldo::TEXT;
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

        IF NEW.anulado <> OLD.anulado THEN
            campo := 'anulado';
            nuevo := NEW.anulado::TEXT;
            anterior := OLD.anulado::TEXT;
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

        IF NEW.fecha_now <> OLD.fecha_now THEN
            campo := 'fechaNow';
            nuevo := NEW.fecha_now::TEXT;
            anterior := OLD.fecha_now::TEXT;
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

        IF NEW.descripcion <> OLD.descripcion THEN
            campo := 'descripcion';
            nuevo := NEW.descripcion;
            anterior := OLD.descripcion;
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
        campo := 'Eliminar Factura Venta';
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

ALTER FUNCTION public.t_factura_venta_historial()
    OWNER TO "MiMascota";


-- Trigger: t_factura_venta_historial

-- DROP TRIGGER IF EXISTS t_factura_venta_historial ON public.factura_ventas;

CREATE OR REPLACE TRIGGER t_factura_venta_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.factura_ventas
    FOR EACH ROW
    EXECUTE FUNCTION public.t_factura_venta_historial();