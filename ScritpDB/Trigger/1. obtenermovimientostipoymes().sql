-- FUNCTION: public.obtenermovimientostipoymes()

-- DROP FUNCTION IF EXISTS public.obtenermovimientostipoymes();

CREATE OR REPLACE FUNCTION public.obtenermovimientostipoymes(
    )
    RETURNS TABLE(fecha text, mes text, tipo text, valor double precision) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT
        TO_CHAR(mv.fecha, 'YYYY-MM-DD') AS fecha,
        TO_CHAR(mv.fecha, 'TMMonth') AS mes,
        mv.tipo::text AS tipo,
        COALESCE(SUM(mv.valor), 0) AS valor
    FROM
        MOVIMIENTOS mv
    WHERE
        EXTRACT(YEAR FROM mv.fecha) = EXTRACT(YEAR FROM CURRENT_DATE)
    GROUP BY
        TO_CHAR(mv.fecha, 'YYYY-MM-DD'), TO_CHAR(mv.fecha, 'TMMonth'), mv.tipo
    ORDER BY
        TO_CHAR(mv.fecha, 'YYYY-MM-DD'), TO_CHAR(mv.fecha, 'TMMonth'), mv.tipo;
    
    RETURN;
END;
$BODY$;

ALTER FUNCTION public.obtenermovimientostipoymes()
    OWNER TO "MiMascota";
