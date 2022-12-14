// mysql의 테이블이 여기서는 model
module.exports = (sequelize, DataType) => {
    const Post = sequelize.define('Post', { 
        //id는 기본적으로 1,2,3,4 ... 순서대로 올라간다
        date: {
            type: DataType.STRING(100),
        },
        content: {
            type: DataType.TEXT,
            allowNull: false, // 필수
        },
    }, {
        modelName: 'Post',
        tableName: 'posts',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', //한글, 이모티콘 저장
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post.addHashtags
        db.Post.hasMany(db.Image); // post.addImages, post.getImages
    };
    // 이건 sequelize가 알아서 만들어주는 거임
    return Post;
} 