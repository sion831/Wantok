#
# QR Code Generator with Brand Image
#
# Copyright (c) Project Wantok. (MIT License)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of
# this software and associated documentation files (the "Software"), to deal in
# the Software without restriction, including without limitation the rights to
# use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
# the Software, and to permit persons to whom the Software is furnished to do so,
# subject to the following conditions:
# - The above copyright notice and this permission notice shall be included in
#   all copies or substantial portions of the Software.
# - The Software is provided "as is", without warranty of any kind, express or
#   implied, including but not limited to the warranties of merchantability,
#   fitness for a particular purpose and noninfringement. In no event shall the
#   authors or copyright holders be liable for any claim, damages or other
#   liability, whether in an action of contract, tort or otherwise, arising from,
#   out of or in connection with the Software or the use or other dealings in the
#   Software.
#

# sys.argv[0] : qrgen.py
# sys.argv[1] : link
# sys.argv[2] : brand image
# sys.argv[3] : output file
# sys.argv[4] : size of the qrcode

from qrcodegen import QrCode, QrSegment
from PIL import Image
import sys

def qr_embed_image(qrcode, embed, output, image_size):
        border = 16
        magnify = 10
        image = Image.new("RGB", (qrcode.get_size()*magnify + border*2, qrcode.get_size()*magnify + border*2))
        embed = embed.resize((int(image.width * 0.4), int(image.height * 0.4)))
                     
        print("Image Resolution:{0}".format((image.width, image.height)))
        print("Resized Resolution:{0}".format((embed.width, embed.height)))

        imgData = image.load()
        for y in range(image.height):
                for x in range(image.width):
                        imgData[x, y] = (255, 255, 255)
        
        for y in range(qrcode.get_size()):
                for x in range(qrcode.get_size()):
                        if qrcode.get_module(x, y) == True:
                                for zy in range(magnify):
                                        for zx in range(magnify):
                                                imgData[x*magnify+zx+border, y*magnify+zy+border] = (0, 0, 0)

        for y in range(embed.height):
                for x in range(embed.width):
                        imgData[border + (qrcode.get_size()/2)*magnify- int(embed.width*0.5)+ x, border + (int(qrcode.get_size()*0.5))*magnify-int(embed.height/2)+y] = embed.getpixel((x, y))

        image.resize((image_size, image_size))                              
        image.save(output, "PNG")


qr = QrCode.encode_text( sys.argv[1], QrCode.Ecc.HIGH)

embed_image = Image.open(sys.argv[2])
qr_embed_image(qr, embed_image,  sys.argv[3], int(sys.argv[4]))

