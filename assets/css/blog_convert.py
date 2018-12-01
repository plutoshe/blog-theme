with open("blog.css") as f, open("blog_b.css", "w") as fw:
	j = 0
	for i in f:
		if "{" in i:
			k = ".blog ";
			for j in i:
				k+=j
				if j == ',':
					k += ".blog "

			fw.write(k)
			print(".blog ", i)
		else:
			fw.write(i)
			print(i)