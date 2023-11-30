-- FUNCTION: public.t_actualizar_venta_inventario()

-- DROP FUNCTION IF EXISTS public.t_actualizar_venta_inventario();

CREATE OR REPLACE FUNCTION public.t_actualizar_venta_inventario()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
    diferencia INTEGER;
BEGIN
    -- Verificar si es una inserción, actualización o eliminación
    IF TG_OP = 'INSERT' THEN
        -- Si es una inserción, aumentar el saldo en el inventario
        UPDATE inventarios
        SET salida = salida + NEW.cantidad,
            saldo = saldo - NEW.cantidad
        WHERE producto_id = NEW.producto_id;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Si es una actualización, calcular la diferencia entre el valor antiguo y el nuevo
        diferencia = NEW.cantidad - OLD.cantidad;
        -- Actualizar el inventario con la diferencia
        UPDATE inventarios
        SET entrada = salida + diferencia,
            saldo = saldo - diferencia
        WHERE producto_id = NEW.producto_id;
    ELSIF TG_OP = 'DELETE' THEN
        -- Si es una eliminación, reducir el saldo en el inventario
        UPDATE inventarios
        SET salida = salida + OLD.cantidad,
            saldo = saldo - OLD.cantidad
        WHERE producto_id = OLD.producto_id;
    END IF;
    RETURN NULL;
END;
$BODY$;

ALTER FUNCTION public.t_actualizar_venta_inventario()
    OWNER TO "MiMascota";



-- Trigger: t_actualizar_venta_inventario

-- DROP TRIGGER IF EXISTS t_actualizar_venta_inventario ON public.ventas;

CREATE OR REPLACE TRIGGER t_actualizar_venta_inventario
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.ventas
    FOR EACH ROW
    EXECUTE FUNCTION public.t_actualizar_venta_inventario();
