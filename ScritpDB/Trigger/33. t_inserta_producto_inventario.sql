-- FUNCTION: public.t_inserta_producto_inventario()

-- DROP FUNCTION IF EXISTS public.t_inserta_producto_inventario();

CREATE OR REPLACE FUNCTION public.t_inserta_producto_inventario()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
-- FUNCTION: public.t_inserta_Producto_inventario()

-- DROP FUNCTION IF EXISTS public.t_inserta_Producto_inventario();

BEGIN
    -- Verificar si es una inserción
    IF TG_OP = 'INSERT' THEN
    
        --Ingresa el producto al inventario
        INSERT INTO public.inventarios(producto_id, entrada, salida, saldo)
        VALUES (NEW.id, 0, 0, 0);
        
    END IF;
    
    RETURN NULL;
END;
$BODY$;

ALTER FUNCTION public.t_inserta_producto_inventario()
    OWNER TO "MiMascota";
    
-- Trigger: t_inserta_producto_inventario

-- DROP TRIGGER IF EXISTS t_inserta_producto_inventario ON public.producto;

CREATE OR REPLACE TRIGGER t_inserta_producto_inventario
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.productos
    FOR EACH ROW
    EXECUTE FUNCTION public.t_inserta_producto_inventario();