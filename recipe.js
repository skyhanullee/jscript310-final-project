class Recipe {
    constructor(image, title, area, category, instructions) {
        this.image = image;
        this.title = title;
        this.area = area;
        this.category = category;
        this.instructions = instructions;
    }

    logToConsole() {
      console.log(this.image);
      console.log(this.title);
      console.log(this.area);
      console.log(this.category);
      console.log(this.instructions);
    }

}
