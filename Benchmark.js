function run_AnalyzeP(parametre, nombre, imp) {
    IJ.run("Set Measurements...", parametre + " redirect=None decimal=3");
    result = new Array();
    var i;
    var total = 0;
    for (i = 0; i < nombre; i++) {
        var start = new Date();
        var start_time = start.getTime();
       
        IJ.run(imp, "Analyze Particles...", "display");
        
        var end = new Date();
        var end_time = end.getTime();
        var time = end_time - start_time;
        total = total + time; 
        
    }
    
    return time/nombre
}


var setM = new Array("area", "mean", "standard", "modal", "min", "centroid", "center", "perimeter", "bounding", "fit", "shape", "feret's", "integrated", "skewness", "area_fraction");

imp = IJ.openImage("http://wsr.imagej.net/images/particles.gif");

var i;
var nb = 100;
for (i = 0; i < setM.length; i++) {
    result = run_AnalyzeP(setM[i], nb, imp);
    IJ.log(setM[i])
    IJ.log(result)  
}
