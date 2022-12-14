// mysql의 테이블이 여기서는 model
module.exports = (sequelize, DataType) => {
    const Image = sequelize.define('Image', { 
        //id는 기본적으로 1,2,3,4 ... 순서대로 올라간다
        src: {
            type: DataType.STRING(1000),
            allowNull: false, // 필수
        },
        userId: { 
            type: DataType.STRING(30),
            allowNull: true, // 필수
        },
        postImgId: {
            type: DataType.STRING(30),
        }
    }, {
        modelName: 'Image',
        tableName: 'images',
        charset: 'utf8',
        collate: 'utf8_general_ci', //한글, 이모티콘 저장
        sequelize,
    }); 
    Image.associate = (db) => { 
        db.Image.belongsTo(db.Post)
    };
    return Image;
}