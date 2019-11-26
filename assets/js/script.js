// flocon / je declare toute les variables
    var niv=0,lim=6,sizX=600,sizY=512; // nombre de niveaux et dimension du canvas
    var cnv,ctx,dir,pas,x,y,spp=false; // spp: superposition des courbes

    function Seg(x1,y1,x2,y2) {
       var dx,dy;
       if (--niv>0) { // subdivision
          dy=(y2-y1)/3;
          if (x1==x2) {
             dx=(dy*8+4)/9;
             Seg(x1,y1,x1,y1+dy); Seg(x1,y1+dy,x1-dx,y1+((y2-y1)>>1));
             Seg(x1-dx,y1+((y2-y1)>>1),x1,y2-dy); Seg(x1,y2-dy,x1,y2);
          } else if (x2>x1) {
             if (y2>y1) {
                dx=(dy*16+4)/9;
                Seg(x1,y1,x1+dx,y1+dy); Seg(x1+dx,y1+dy,x1+dx,y2);
                Seg(x1+dx,y2,x2-dx,y2-dy); Seg(x2-dx,y2-dy,x2,y2);
             } else {
                dx=(-dy*16+4)/9;
                Seg(x1,y1,x1+dx,y1+dy); Seg(x1+dx,y1+dy,x2-dx,y1);
                Seg(x2-dx,y1,x2-dx,y2-dy); Seg(x2-dx,y2-dy,x2,y2);
             }
          } else { // (x2<x1)
             if (y2>y1) {
                dx=(dy*16+4)/9;
                Seg(x1,y1,x1-dx,y1+dy); Seg(x1-dx,y1+dy,x2+dx,y1);
                Seg(x2+dx,y1,x2+dx,y2-dy); Seg(x2+dx,y2-dy,x2,y2);
             } else {
                dx=(-dy*16+4)/9;
                Seg(x1,y1,x1-dx,y1+dy); Seg(x1-dx,y1+dy,x1-dx,y2);
                Seg(x1-dx,y2,x2+dx,y2-dy); Seg(x2+dx,y2-dy,x2,y2);
             }
          }
       } else { // Line(x1,y1,x2,y2);
         ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
       }
       niv++;
    }
    //se battre avec le canvas
    function Flocon() {
       if (++niv>lim) niv=1;
       ctx.clearRect(0,0,sizX,sizY); ctx.beginPath();
       Seg(432,472,432,40); Seg(432,40,48,256); Seg(48,256,432,472);
       ctx.stroke(); ctx.closePath();
    }
    function Ini() {
       cnv=document.getElementById('cv'); cnv.width=sizX; cnv.height=sizY;
       ctx=cnv.getContext("2d"); Flocon();
    }
 //]]>
