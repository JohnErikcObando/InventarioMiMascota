-- FUNCTION: public.obtenerventaspordia()

-- DROP FUNCTION IF EXISTS public.obtenerventaspordia();

CREATE OR REPLACE FUNCTION public.obtenerventaspordia(
	)
    RETURNS TABLE(dia text, total numeric) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
    anio_actual integer;
    mes_actual integer;
    fecha_actual date;
    dia_semana text;
BEGIN
    -- Obtiene el año y el mes actual
    SELECT EXTRACT(YEAR FROM CURRENT_DATE), EXTRACT(MONTH FROM CURRENT_DATE) INTO anio_actual, mes_actual;
    
    -- Inicializa la tabla temporal para almacenar los resultados
    CREATE TEMP TABLE resultados_temp (dia text, total numeric);
    
    -- Inicializa la fecha al primer día del mes actual
    fecha_actual := DATE_TRUNC('month', CURRENT_DATE);
    
    -- Ciclo FOR para iterar a través de los días de la semana
    FOR i IN 0..6 LOOP
        -- Obtiene el día de la semana como texto (lunes, martes, etc.)
        dia_semana := TO_CHAR(fecha_actual, 'Day');
        
        -- Escapa el nombre del día de la semana entre comillas simples
        dia_semana := QUOTE_LITERAL(dia_semana);
        
        -- Calcula el total de ventas para el día actual
        EXECUTE 'INSERT INTO resultados_temp (dia, total) SELECT ' || dia_semana || ', COALESCE(SUM(total), 0) FROM factura_ventas WHERE EXTRACT(MONTH FROM fecha) = ' || mes_actual || ' AND EXTRACT(DOW FROM fecha) = ' || i;
        
        -- Añade un día a la fecha actual
        fecha_actual := fecha_actual + INTERVAL '1 day';
    END LOOP;
    
    -- Devuelve los resultados de la tabla temporal
    RETURN QUERY SELECT * FROM resultados_temp;
    
    -- Borra la tabla temporal
    DROP TABLE resultados_temp;
END;
$BODY$;

ALTER FUNCTION public.obtenerventaspordia()
    OWNER TO "MiMascota";
