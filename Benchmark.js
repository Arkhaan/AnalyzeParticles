// import ij.*;
// import ij.plugin.filter.PlugInFilter;
// import ij.process.*;
// import ij.gui.*;
// import java.awt.*;
// import java.awt.event.*;
// import java.util.*;

    var parametre;
    parametre = "area bounding fit";
    var d = new Date();
    var time = d.getTime();
    IJ.log(time);

    imp = IJ.openImage("http://wsr.imagej.net/images/particles.gif");
    IJ.run("Set Measurements...", parametre + " redirect=None decimal=3");
    IJ.run(imp, "Analyze Particles...", "display");

    time = d.getTime();
    IJ.log(time);
