<!doctype html>
<?php
/*
 * fileopen.php
 * To be used with ext-server_opensave.js for SVG-edit
 *
 * Licensed under the Apache License, Version 2
 *
 * Copyright(c) 2010 Alexis Deveria
 *
 */
	// Very minimal PHP file, all we do is Base64 encode the uploaded file and
	// return it to the editor
        $type = "import_img";
	$output = file_get_contents($_GET["image"]);
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime_type = finfo_buffer($finfo, $output);
        finfo_close($finfo);
        $prefix = 'data:' . $mime_type . ';base64,';

?>
<script>
window.top.window.methodDraw.processFile("<?php echo $prefix . base64_encode($output); ?>", "<?php echo htmlentities($type); ?>");
</script>
