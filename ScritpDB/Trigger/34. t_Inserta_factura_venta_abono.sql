CREATE OR REPLACE FUNCTION t_Inserta_factura_venta_abono()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT'  THEN
		IF NEW.abono>0 then
            INSERT INTO abonos_factura_venta (
                factura_venta_id,
                fecha,
                valor,
                forma_pago_id,
                anulado,
                usuario_modif,
                fecha_now
            ) VALUES (
                NEW.id,
                NEW.fecha,
                NEW.abono,
                NEW.forma_pago_id,
                NEW.anulado,
                NEW.usuario_modif,
                NOW()
            );
        END IF;
	END IF;	
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER t_Inserta_factura_venta_abono
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.factura_ventas
    FOR EACH ROW
    EXECUTE FUNCTION public.t_Inserta_factura_venta_abono();
	
