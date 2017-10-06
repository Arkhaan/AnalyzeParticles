library(ggplot2)
csv_file = "/home/jean/Documents/Master_Bioinfo/M2/Biologie_structurale/Analyse_particles/result/result_colonne.csv"
df = read.csv(csv_file, header=T)
attach (df)
names = c( "Particule detection","Bounding rectangle", "Area","Perimeter","Centroid", "Fit Elipse", "Shape", "Feret’s diameter")

colnames(df)=names

moy = c()
ecar = c()

for (n in names) {
  print(n)
  ecar = c(ecar, sd(df[,n]))
  moy = c(moy, mean(df[,n]))
  
}

result = data.frame(names, moy, ecar)
colnames(result) = c("Measure", "Time", "ecar")

p <- ggplot(result, aes(x=Measure, y=Time)) + 
  geom_bar(stat="identity", position=position_dodge(), fill="steelblue") +
  geom_errorbar(aes(ymin=Time-ecar, ymax=Time+ecar), width=.2,
                position=position_dodge(.9))
p 
p
