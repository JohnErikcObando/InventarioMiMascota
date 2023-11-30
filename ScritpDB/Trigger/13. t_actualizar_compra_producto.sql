-- FUNCTION: public.t_actualizar_compra_producto()

-- DROP FUNCTION IF EXISTS public.t_actualizar_compra_producto();

CREATE OR REPLACE FUNCTION public.t_actualizar_compra_producto()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
    -- Verificar si es una inserción o actualización 
    IF TG_OP = 'INSERT' THEN
        -- Si es una inserción, verifica el valor para actualizar el producto
            UPDATE productos
            SET valor = NEW.venta
            WHERE id = NEW.producto_id AND valor<>NEW.venta;
			
    ELSIF TG_OP = 'UPDATE' THEN
        -- Actualizar el valor del producto
        IF NEW.venta <> OLD.venta THEN
            UPDATE productos
            SET valor = NEW.venta
            WHERE id = NEW.producto_id;
        END IF;
    END IF;
	
    RETURN NULL;
END;
$BODY$;

ALTER FUNCTION public.t_actualizar_compra_producto()
    OWNER TO "MiMascota";


-- Trigger: t_actualizar_compra_producto

-- DROP TRIGGER IF EXISTS t_actualizar_compra_producto ON public.compras;

CREATE OR REPLACE TRIGGER t_actualizar_compra_producto
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.compras
    FOR EACH ROW
    EXECUTE FUNCTION public.t_actualizar_compra_producto();