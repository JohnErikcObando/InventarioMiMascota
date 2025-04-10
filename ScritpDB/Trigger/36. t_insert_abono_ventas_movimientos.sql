-- FUNCTION: public.t_insert_abono_ventas_movimientos()

-- DROP FUNCTION IF EXISTS public.t_insert_abono_ventas_movimientos();

CREATE OR REPLACE FUNCTION public.t_insert_abono_ventas_movimientos()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
    movimiento_id INT;
BEGIN
    -- Verificar si es una inserción
    IF TG_OP = 'INSERT' THEN
        IF NEW.valor>0 THEN
			-- Insertar un nuevo registro en la tabla movimientos y capturar el ID devuelto
			INSERT INTO movimientos (fecha, tipo, descripcion, valor, factura,usuario_modif)
			VALUES (
				NEW.fecha,
				'Venta',
				'Factura ' || NEW.factura_venta_id,
				NEW.valor,
				NEW.factura_venta_id,  -- Reemplazar con el nombre correcto del campo
				NEW.usuario_modif
			)
			RETURNING id INTO movimiento_id;

			-- Puedes hacer algo con el valor capturado, si es necesario
			-- Por ejemplo, imprimirlo o utilizarlo de alguna manera
			RAISE NOTICE 'Nuevo movimiento creado con ID: %', movimiento_id;
		END IF;
    END IF;

    -- Debe devolver NULL al final de un trigger BEFORE INSERT
    RETURN NULL;
END;
$BODY$;

ALTER FUNCTION public.t_insert_abono_ventas_movimientos()
    OWNER TO ggsbvaiq;



CREATE TRIGGER t_insert_abono_ventas_movimientos
    AFTER INSERT
    ON public.abonos_factura_venta
    FOR EACH ROW
    EXECUTE FUNCTION public.t_insert_abono_ventas_movimientos();