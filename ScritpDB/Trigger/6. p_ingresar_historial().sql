-- PROCEDURE: public.p_ingresar_historial(text, text, text, text, text, text, text)

-- DROP PROCEDURE IF EXISTS public.p_ingresar_historial(text, text, text, text, text, text, text);

CREATE OR REPLACE PROCEDURE public.p_ingresar_historial(
    IN p_usuario text,
    IN p_campo text,
    IN p_modulo text,
    IN p_identificador text,
    IN p_nuevo text,
    IN p_anterior text,
    IN p_accion text)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    INSERT INTO historial (usuario_modif, campo, modulo, identificador, fecha, nuevo, anterior, accion)
    VALUES (p_usuario, p_campo, p_modulo, p_identificador, NOW(), p_nuevo, p_anterior, p_accion);
END;
$BODY$;
ALTER PROCEDURE public.p_ingresar_historial(text, text, text, text, text, text, text)
    OWNER TO "MiMascota";
