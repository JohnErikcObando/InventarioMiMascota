-- FUNCTION: public.obtenerproductosmasvendidospormes()

-- DROP FUNCTION IF EXISTS public.obtenerproductosmasvendidospormes();

CREATE OR REPLACE FUNCTION public.obtenerproductosmasvendidospormes(
    )
    RETURNS TABLE(mes text, nombre_producto text, cantidad_producto numeric) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT
        TO_CHAR(fv.fecha, 'TMMonth') AS mes,  -- Nombre del mes en español
        p.nombre::text AS nombre_producto,
        sum(v.cantidad::numeric) AS cantidad_producto
    FROM
        factura_ventas fv
    JOIN
        ventas v ON fv.id = v.factura_venta_id
    JOIN
        productos p ON v.producto_id = p.id
    WHERE
        EXTRACT(YEAR FROM fv.fecha) = EXTRACT(YEAR FROM CURRENT_DATE)
    GROUP BY
        TO_CHAR(fv.fecha, 'TMMonth'), p.nombre, p.valor
    HAVING
        SUM(v.cantidad) > 0
    ORDER BY
        TO_CHAR(fv.fecha, 'TMMonth'), SUM(v.cantidad) DESC
    LIMIT 10;

    RETURN;
END;
$BODY$;

ALTER FUNCTION public.obtenerproductosmasvendidospormes()
    OWNER TO "MiMascota";
