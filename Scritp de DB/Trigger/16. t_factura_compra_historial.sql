-- FUNCTION: public.t_factura_compra_historial()

-- DROP FUNCTION IF EXISTS public.t_factura_compra_historial();

CREATE OR REPLACE FUNCTION public.t_factura_compra_historial()
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
    modulo := 'Factura Compra';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nueva Factura Compra';
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
        IF NEW.proveedor_id <> OLD.proveedor_id THEN
            campo := 'proveedorId';
            nuevo := NEW.proveedor_id;
            anterior := OLD.proveedor_id;
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
            campo := 'movimiento';
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

        IF NEW.imagen_url <> OLD.imagen_url THEN
            campo := 'imagenUrl';
            nuevo := NEW.imagen_url;
            anterior := OLD.imagen_url;
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
        campo := 'Eliminar Factura Compra';
        nuevo := OLD.id::TEXT;
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

ALTER FUNCTION public.t_factura_compra_historial()
    OWNER TO "MiMascota";


-- Trigger: t_factura_compra_historial

-- DROP TRIGGER IF EXISTS t_factura_compra_historial ON public.factura_compras;

CREATE OR REPLACE TRIGGER t_factura_compra_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.factura_compras
    FOR EACH ROW
    EXECUTE FUNCTION public.t_factura_compra_historial();