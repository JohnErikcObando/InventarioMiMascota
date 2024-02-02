-- FUNCTION: public.obtenerventaspormes()

-- DROP FUNCTION IF EXISTS public.obtenerventaspormes();

CREATE OR REPLACE FUNCTION public.obtenerventaspormes(
	)
    RETURNS TABLE(mes text, total numeric) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
    anio_actual integer;
    mes_actual integer;
    mes_nombre text; -- Declarar la variable mes_nombre
BEGIN
    -- Obtiene el año y el mes actual
    SELECT EXTRACT(YEAR FROM CURRENT_DATE), EXTRACT(MONTH FROM CURRENT_DATE) INTO anio_actual, mes_actual;
    
    -- Inicializa la tabla temporal para almacenar los resultados
    CREATE TEMP TABLE resultados_temp (mes text, total numeric);
    
    -- Ciclo FOR para iterar a través de los meses del año
    FOR i IN 1..12 LOOP
        -- Obtiene el nombre del mes en español
        EXECUTE 'SELECT to_char(DATE_TRUNC(''MONTH'', (DATE ''2000-01-01'' + (' || i || ' - 1) * INTERVAL ''1 month'')), ''Month'')' INTO mes_nombre;
        
        -- Calcula el total de ventas para el mes actual
        EXECUTE 'INSERT INTO resultados_temp (mes, total) SELECT ' || quote_literal(mes_nombre) || ', COALESCE(SUM(total), 0) FROM factura_ventas WHERE EXTRACT(MONTH FROM fecha) = ' || i || ' AND EXTRACT(YEAR FROM fecha) = ' || anio_actual;
    END LOOP;
    
    -- Devuelve los resultados de la tabla temporal
    RETURN QUERY SELECT * FROM resultados_temp;
    
    -- Borra la tabla temporal
    DROP TABLE resultados_temp;
END;
$BODY$;

ALTER FUNCTION public.obtenerventaspormes()
    OWNER TO "MiMascota";
