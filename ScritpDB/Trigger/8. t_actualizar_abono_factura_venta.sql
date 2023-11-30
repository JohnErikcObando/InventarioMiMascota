
-- FUNCTION: public.t_actualizar_abono_factura_venta()

-- DROP FUNCTION IF EXISTS public.t_actualizar_abono_factura_venta();

CREATE OR REPLACE FUNCTION public.t_actualizar_abono_factura_venta()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
    -- Verifica si el evento es una inserción en la tabla abonos_factura_venta
    IF TG_OP = 'INSERT' THEN
        -- Suma el nuevo valor del abono al valor actual de la factura
        UPDATE factura_ventas
        SET abono = factura_ventas.abono + NEW.valor
        WHERE factura_ventas.id = NEW.factura_venta_id;

    -- Verifica si el evento es una actualización en la tabla abonos_factura_venta
    ELSIF TG_OP = 'UPDATE' THEN
        -- Obtiene la diferencia entre el valor nuevo y el valor anterior del abono
        -- Luego suma esta diferencia al valor actual de la factura
        UPDATE factura_ventas
        SET abono = factura_ventas.abono + (NEW.valor - OLD.valor)
        WHERE factura_ventas.id = NEW.factura_venta_id;

    -- Verifica si el evento es una eliminación en la tabla abonos_factura_venta
    ELSIF TG_OP = 'DELETE' THEN
        -- Resta el valor del abono eliminado al valor actual de la factura
        UPDATE factura_ventas
        SET abono = factura_ventas.abono - OLD.valor
        WHERE factura_ventas.id = OLD.factura_venta_id;
    END IF;

    RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.t_actualizar_abono_factura_venta()
    OWNER TO "MiMascota";


-- Trigger: t_actualizar_abono_factura_venta

-- DROP TRIGGER IF EXISTS t_actualizar_abono_factura_venta ON public.abonos_factura_venta;

CREATE OR REPLACE TRIGGER t_actualizar_abono_factura_venta
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.abonos_factura_venta
    FOR EACH ROW
    EXECUTE FUNCTION public.t_actualizar_abono_factura_venta();