
CREATE OR REPLACE FUNCTION t_actualiza_abono_factura_venta()
RETURNS TRIGGER AS $$
DECLARE
    num_pagos INTEGER;
BEGIN

	num_pagos=0;
	
  IF TG_OP = 'INSERT'  THEN
  	SELECT COUNT(id) INTO num_pagos FROM abonos_factura_venta WHERE factura_venta_id = NEW.factura_venta_id;
    IF num_pagos > 1 THEN
        UPDATE factura_ventas SET abono = abono + NEW.valor, saldo = total - (abono + NEW.valor) WHERE id = NEW.factura_venta_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
  	IF (NEW.anulado=1) OR (OLD.anulado=0) THEN
	 	UPDATE factura_ventas SET abono=abono - NEW.valor , saldo=(total-(abono-NEW.valor)) WHERE id = NEW.factura_venta_id;
	ELSIF  (NEW.anulado=0) OR (OLD.anulado=1) THEN
		UPDATE factura_ventas SET abono=abono + OLD.valor , saldo=(total-(abono+NEW.valor)) WHERE id = NEW.factura_venta_id;
	END IF;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE factura_ventas SET abono=abono-OLD.valor , saldo=(total-(abono-OLD.valor)) WHERE id = NEW.factura_venta_id ;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER t_actualiza_abono_factura_venta
AFTER INSERT OR UPDATE OR DELETE ON abonos_factura_venta
FOR EACH ROW
EXECUTE FUNCTION t_actualiza_abono_factura_venta();



