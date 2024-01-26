
CREATE OR REPLACE FUNCTION t_actualiza_abono_factura_venta()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT'  THEN
    UPDATE factura_ventas SET abono=abono + NEW.valor , saldo=((abono+NEW.valor)-total) WHERE id = NEW.factura_venta_id ;
  ELSIF TG_OP = 'UPDATE' THEN
  	IF (NEW.anulado=1) OR (OLD.anulado=0) THEN
	 	UPDATE factura_ventas SET abono=abono - NEW.valor , saldo=((abono-NEW.valor)-total) WHERE id = NEW.factura_venta_id;
	ELSIF  (NEW.anulado=0) OR (OLD.anulado=1) THEN
		UPDATE factura_ventas SET abono=abono + OLD.valor , saldo=((abono+NEW.valor)-total) WHERE id = NEW.factura_venta_id;
	END IF;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE factura_ventas SET abono=abono-OLD.valor , saldo=((abono-OLD.valor)-total) WHERE id = NEW.factura_venta_id ;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER t_actualiza_abono_factura_venta
AFTER INSERT OR UPDATE OR DELETE ON abonos_factura_venta
FOR EACH ROW
EXECUTE FUNCTION t_actualiza_abono_factura_venta();



