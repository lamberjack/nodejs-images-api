module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
      },
      
      //not a column on db
      info: {
        type: DataTypes.VIRTUAL,
        get() {
          return `ID: ${this.id} - NAME: ${this.name} - STATUS: ${this.status}`;
        },
        set(value) {
          throw new Error('Do not try to set the `info` value!');
        }
      }
    });
    return Image;
  };