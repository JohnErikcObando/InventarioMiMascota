CREATE OR REPLACE FUNCTION t_actualizar_caja_num_factura()
RETURNS TRIGGER AS $$
BEGIN
    -- Actualiza el número de factura en la tabla cajas
    UPDATE cajas
    SET num_factura = num_factura + 1
    WHERE id = NEW.caja_id; -- Asegúrate de que NEW.caja_id es el campo correcto
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crea el trigger asociado
DROP TRIGGER IF EXISTS t_actualizar_caja_num_factura ON factura_ventas;

DROP TRIGGER IF EXISTS t_actualizar_caja_num_factura ON factura_compras;

CREATE TRIGGER t_actualizar_caja_num_factura
AFTER INSERT ON factura_ventas
FOR EACH ROW
EXECUTE FUNCTION t_actualizar_caja_num_factura();


CREATE TRIGGER t_actualizar_caja_num_factura
AFTER INSERT ON factura_compras
FOR EACH ROW
EXECUTE FUNCTION t_actualizar_caja_num_factura();