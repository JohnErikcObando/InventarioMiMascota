-- FUNCTION: public.t_actualiza_abono_factura_venta()

-- DROP FUNCTION IF EXISTS public.t_actualiza_abono_factura_venta();

CREATE OR REPLACE FUNCTION public.t_actualiza_abono_factura_venta()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
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
$BODY$;

ALTER FUNCTION public.t_actualiza_abono_factura_venta()
    OWNER TO MiMascota;


-- Trigger: t_actualizar_abono_factura_venta

-- DROP TRIGGER IF EXISTS t_actualizar_abono_factura_venta ON public.abonos_factura_venta;

CREATE OR REPLACE TRIGGER t_actualizar_abono_factura_venta
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.abonos_factura_venta
    FOR EACH ROW
    EXECUTE FUNCTION public.t_actualizar_abono_factura_venta();