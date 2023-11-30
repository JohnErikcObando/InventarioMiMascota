-- FUNCTION: public.t_insert_factura_compras_movimientos()

-- DROP FUNCTION IF EXISTS public.t_insert_factura_compras_movimientos();

CREATE OR REPLACE FUNCTION public.t_insert_factura_compras_movimientos()
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
        -- Insertar un nuevo registro en la tabla movimientos y capturar el ID devuelto
        INSERT INTO movimientos (fecha, tipo, descripcion, valor, factura,usuario_modif)
		VALUES (
			NEW.fecha,
			'Gasto',
			'Factura ' || NEW.id,
			NEW.valor,
			NEW.id,  -- Reemplazar con el nombre correcto del campo
			NEW.usuario_modif
		)
		RETURNING id INTO movimiento_id;

        -- Puedes hacer algo con el valor capturado, si es necesario
        -- Por ejemplo, imprimirlo o utilizarlo de alguna manera
        RAISE NOTICE 'Nuevo movimiento creado con ID: %', movimiento_id;
    END IF;

    -- Debe devolver NULL al final de un trigger BEFORE INSERT
    RETURN NULL;
END;
$BODY$;

ALTER FUNCTION public.t_insert_factura_compras_movimientos()
    OWNER TO "MiMascota";


-- Trigger: t_insert_factura_compras_movimientos

-- DROP TRIGGER IF EXISTS t_insert_factura_compras_movimientos ON public.factura_compras;

CREATE OR REPLACE TRIGGER t_insert_factura_compras_movimientos
    AFTER INSERT
    ON public.factura_compras
    FOR EACH ROW
    EXECUTE FUNCTION public.t_insert_factura_compras_movimientos();