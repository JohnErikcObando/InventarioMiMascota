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
    total numeric;
BEGIN
    -- Obten el año actual
    SELECT EXTRACT(YEAR FROM CURRENT_DATE) INTO anio_actual;

    -- Inicializa la tabla temporal para almacenar los resultados
    CREATE TEMP TABLE resultados_temp (mes text, total numeric);

    -- Ciclo FOR para iterar a través de los meses
    FOR mes_actual IN 1..12 LOOP
        -- Inicializa la variable resultado en 0
        total := 0;

        -- Construye la consulta dinámica para obtener las ventas del mes
        EXECUTE 'SELECT COALESCE(SUM(total), 0) FROM factura_ventas WHERE EXTRACT(MONTH FROM fecha) = ' || mes_actual || ' AND EXTRACT(YEAR FROM fecha) = ' || anio_actual INTO total;

        -- Inserta el resultado en la tabla temporal
        INSERT INTO resultados_temp (mes, total) VALUES (TO_CHAR(DATE '2000-01-01' + INTERVAL '1 month' * mes_actual, 'TMMonth'), total);
    END LOOP;

    -- Devuelve los resultados de la tabla temporal
    RETURN QUERY SELECT * FROM resultados_temp;

    -- Borra la tabla temporal
    DROP TABLE resultados_temp;
END;
$BODY$;

ALTER FUNCTION public.obtenerventaspormes()
    OWNER TO "MiMascota";
