/* 
 * QR Code generator demo (JavaScript)
 * 
 * Copyright (c) 2016 Project Nayuki. (MIT License)
 * https://www.nayuki.io/page/qr-code-generator-library
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */

// Modified by cbchoi for demo 23/05/2018
"use strict";


function redrawQrCode() {
	// Show/hide rows based on bitmap/vector image output
	var bitmapOutput = true;

	// Reset output images in case of early termination
	var canvas = document.getElementById("qrcode-canvas");
	//var svg = document.getElementById("qrcode-svg");
	canvas.style.display = "none";

	
	// Get form inputs and compute QR Code
	var ecl = qrcodegen.QrCode.Ecc.HIGH;
	var text = document.getElementById("text-input").value;
	var segs = qrcodegen.QrSegment.makeSegments(text);

	var minVer = 1;
	var maxVer = 40;
	var mask = -1;
	var boostEcc = true;
	var qr = qrcodegen.QrCode.encodeSegments(segs, ecl, minVer, maxVer, mask, boostEcc);
	
	// Draw image output
	var border = 4;
	if (border < 0 || border > 100)
		return;
    var scale = 8;
    if (scale <= 0 || scale > 30)
        return;

    qr.drawCanvas(scale, border, canvas);
    canvas.style.removeProperty("display");

}



redrawQrCode();
