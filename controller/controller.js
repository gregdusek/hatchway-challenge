const axios = require('axios');

const getApi = (req, res) => {
    res.status(200).send({
        success: true,
    })
};

const getTags = (req, res) => {
    const {tags, sortBy, direction} = req.params;
    const sortType = ['id', 'author', 'authorId', 'likes', 'popularity', 'reads', 'tags', undefined];
    const sortDirection = ['asc', 'desc', undefined];

    // Produces error if the sort/direction is not valid
    if (sortType.indexOf(sortBy) === - 1) {
        res.status(400).send({
            error: 'sortBy parameter is invalid',
        })
    };
    if (sortDirection.indexOf(direction) === - 1) {
        res.status(400).send({
            error: 'sortDirection parameter is invalid',
        });
    }

    //Use of multiple tags in a query
    if (tags.indexOf(',') !== - 1) {
        let tagArray = tags.split(',');
        let queryPaths = tagArray.map((tag, i) => {
            return axios.get(`hatchways.io/api/assessment/blog/posts?tags=${tag}&sortBy=${sortBy}&direction=${direction}`)
        });
        axios.all([queryPaths])

        // 9 total tags can be used in the query. If the value is not used, it will be ignored by using an empty string
        // Null & undefined values are not used because the length method is used on the array
        .then(axios.spread((tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9) => {
            let data = [
                tag1 ? tag1.data.posts : '',
                tag2 ? tag2.data.posts : '',
                tag3 ? tag3.data.posts : '',
                tag4 ? tag4.data.posts : '',
                tag5 ? tag5.data.posts : '',
                tag6 ? tag6.data.posts : '',
                tag7 ? tag7.data.posts : '',
                tag8 ? tag8.data.posts : '',
                tag9 ? tag9.data.posts : '',
            ]
            // Duplicates are removed by creating a hastable and then using the filter method to remove duplicates
            let post = {};
            let posts = [];
            for (let i = 0; i < data.length; i++) {
                let blog = data[i];
                for (let i = 0; i < data[i].length; j++) {
                    post[data[i].id] = blog[i];
                }
            }
            //Response to ensure request is formated correctly
            for(let key in post) {
                posts.push(post[key]);
            }
            //If the sortBy parameter is used, the posts are sorted by the parameter
            if (sortBy) {
                if(direction === 'desc') {
                    posts = posts.sort((a, b) => (b[sortBy] > a[sortBy]) ? 1 : -1);
                } else {
                    posts = posts.sort((a, b) => (b[sortBy] < a[sortBy]) ? 1 : -1);
                }
            }
            res.status(200).send(posts);
        }))
        //Error returned if no tags are used in the query
        .catch(err => {
            res.status(400).send({
                error: 'No tags used in query',
            })
            console.log(err)
        });
    } else {
        //If only one tag is used, the query is executed
        axios.get(`hatchways.io/api/assessment/blog/posts?tags=${tags}&sortBy=${sortBy}&direction=${direction}`)
        .then(request => {
            let data = response.data.posts;
            if(sortBy) {
                if(direction === 'desc') {
                    data = data.sort((a, b) => (b[sortBy] > a[sortBy]) ? 1 : -1);
                } else {
                    data = data.sort((a, b) => (b[sortBy] < a[sortBy]) ? 1 : -1);
                }
            }
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(400).send({
                error: 'No tags used in query',
            })
            console.log(err)
        });

    }
}

module.exports = {getApi, getTags};