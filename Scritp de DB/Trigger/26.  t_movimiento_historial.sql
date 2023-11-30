-- FUNCTION: public.t_movimiento_historial()

-- DROP FUNCTION IF EXISTS public.t_movimiento_historial();

CREATE OR REPLACE FUNCTION public.t_movimiento_historial()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
    campo VARCHAR;
    nuevo VARCHAR;
    anterior VARCHAR;
    modulo VARCHAR;
    accion VARCHAR;
BEGIN
    modulo := 'Movimiento';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nuevo Movimiento';
        nuevo := '';
        anterior := '';
        accion := 'Ingreso';
        CALL p_ingresar_historial(
            NEW.usuario_modif,
            campo,
            modulo,
            NEW.id::TEXT,
            nuevo,
            anterior,
            accion
        );

    ELSIF TG_OP = 'UPDATE' THEN
        accion := 'Actualizar';

        -- Verificar cada campo individualmente y registrar cambios
        IF NEW.fecha <> OLD.fecha THEN
            campo := 'fecha';
            nuevo := NEW.fecha::TEXT;
            anterior := OLD.fecha::TEXT;
            CALL p_ingresar_historial(
                NEW.usuario_modif,
                campo,
                modulo,
                NEW.id::TEXT,
                nuevo,
                anterior,
                accion
            );
        END IF;

        IF NEW.tipo <> OLD.tipo THEN
            campo := 'tipo';
            nuevo := NEW.tipo;
            anterior := OLD.tipo;
            CALL p_ingresar_historial(
                NEW.usuario_modif,
                campo,
                modulo,
                NEW.id::TEXT,
                nuevo,
                anterior,
                accion
            );
        END IF;
	
		 IF NEW.descripcion <> OLD.descripcion THEN
            campo := 'descripcion';
            nuevo := NEW.descripcion;
            anterior := OLD.descripcion;
            CALL p_ingresar_historial(
                NEW.usuario_modif,
                campo,
                modulo,
                NEW.id::TEXT,
                nuevo,
                anterior,
                accion
            );
        END IF;
		
		IF NEW.valor <> OLD.valor THEN
            campo := 'valor';
            nuevo := NEW.valor;
            anterior := OLD.valor;
            CALL p_ingresar_historial(
                NEW.usuario_modif,
                campo,
                modulo,
                NEW.id::TEXT,
                nuevo,
                anterior,
                accion
            );
        END IF;
		
		IF NEW.factura <> OLD.factura THEN
            campo := 'factura';
            nuevo := NEW.factura;
            anterior := OLD.factura;
            CALL p_ingresar_historial(
                NEW.usuario_modif,
                campo,
                modulo,
                NEW.id::TEXT,
                nuevo,
                anterior,
                accion
            );
        END IF;

        

    ELSIF TG_OP = 'DELETE' THEN
        campo := 'Eliminar Movimiento';
        nuevo := '';
        anterior := '';
        accion := 'Eliminar';
        CALL p_ingresar_historial(
            OLD.usuario_modif,
            campo,
            modulo,
            OLD.id::TEXT, 
            nuevo,
            anterior,
            accion
        );
    END IF;

    RETURN NULL;
END;
$BODY$;

ALTER FUNCTION public.t_movimiento_historial()
    OWNER TO "MiMascota";


-- Trigger: t_movimiento_historial

-- DROP TRIGGER IF EXISTS t_movimiento_historial ON public.movimientos;

CREATE OR REPLACE TRIGGER t_movimiento_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.movimientos
    FOR EACH ROW
    EXECUTE FUNCTION public.t_movimiento_historial();