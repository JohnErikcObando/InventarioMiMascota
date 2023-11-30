-- FUNCTION: public.obtenerventasporsemana()

-- DROP FUNCTION IF EXISTS public.obtenerventasporsemana();

CREATE OR REPLACE FUNCTION public.obtenerventasporsemana(
	)
    RETURNS TABLE(dia text, total numeric) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
    fecha_actual date;
    fecha_inicio date;
    fecha_fin date;
    dia_semana text;
    total_venta numeric;
BEGIN
    -- Inicializa la tabla temporal para almacenar los resultados
    CREATE TEMP TABLE resultados_temp (dia text, total numeric);
    
    -- Obtiene la fecha actual
    fecha_actual := CURRENT_DATE;
    
    -- Calcula la fecha de inicio de la semana actual (lunes)
    fecha_inicio := fecha_actual - (EXTRACT(DOW FROM fecha_actual) - 1) * interval '1 day';
    
    -- Calcula la fecha de finalización de la semana siguiente (domingo)
    fecha_fin := fecha_inicio + interval '13 days';
    
    -- Ciclo FOR para iterar a través de los días de la semana en el orden deseado
    FOR dia_semana_num IN 0..6 LOOP
        -- Calcula el día de la semana en español
        dia_semana := CASE dia_semana_num
            WHEN 0 THEN 'Domingo'
            WHEN 1 THEN 'Lunes'
            WHEN 2 THEN 'Martes'
            WHEN 3 THEN 'Miércoles'
            WHEN 4 THEN 'Jueves'
            WHEN 5 THEN 'Viernes'
            WHEN 6 THEN 'Sábado'
        END;
        
        -- Verifica si la fecha está dentro de la semana actual o la siguiente
        IF fecha_inicio <= fecha_actual AND fecha_actual <= fecha_fin THEN
            -- Calcula el total de ventas para el día actual
            SELECT COALESCE(SUM(factura_ventas.total), 0)
            INTO total_venta
            FROM factura_ventas
            WHERE EXTRACT(DOW FROM factura_ventas.fecha) = dia_semana_num
            AND factura_ventas.fecha >= fecha_inicio
            AND factura_ventas.fecha <= fecha_actual;
        ELSE
            -- Si la fecha está fuera del rango, establece el valor en 0
            total_venta := 0;
        END IF;
        
        -- Inserta el resultado en la tabla temporal
        INSERT INTO resultados_temp (dia, total)
        VALUES (dia_semana, total_venta);
    END LOOP;
    
    -- Devuelve los resultados de la semana actual y la siguiente
    RETURN QUERY SELECT * FROM resultados_temp;
    
    -- Borra la tabla temporal
    DROP TABLE resultados_temp;
END;
$BODY$;

ALTER FUNCTION public.obtenerventasporsemana()
    OWNER TO "MiMascota";
