var express = require('express');
var url = require('url');
var router = express.Router();
const { Detail } = require('../models/detail');
const { User } = require('../models/user');
const { Classification } = require('../models/classification');
const { Tag } = require('../models/tag');
const jwt = require('jsonwebtoken');
const { compareSync } = require('bcrypt');
const SECRET = 'dahdjanxahqkwqwjqsq';
const bcrypt = require('bcrypt');


// 验证token中间件
const auth = async (req, res, next)=> {
  if(req.url == '/login') {
    next();
  } else {
    const token = String(req.headers.authorization).split(' ')[1];
    if(token) {
      try {
        const userId = jwt.verify(token, SECRET).id;
        const curUserId = await User.find({
          username: 15640623660
        });
        if(userId == curUserId[0]._id) {
          next();
        }else {
          res.send('登录失效')
        }
      } catch (error) {
        res.send(error);
      }
    }else {
      res.send('token失效');
    }
  }
  
}



// 登录
router.post('/login', auth, async function(req, res) {
  // console.log(req.body.username);
  const user = await User.find({
    username: req.body.username
  });

  if(!user.length) {
    return res.send('用户不存在');
  }
  const isPasswordValid = bcrypt.compareSync(req.body.password, user[0].password);
  if(!isPasswordValid) {
    return res.send('密码错误');
  }
  const token = jwt.sign({
    id: user[0]._id
  }, SECRET);
  res.send({
    user,
    token: token
  })
})

// 发布文章
router.post('/createArticle', auth, async function(req, res) {
  const fromFEArticle = req.body;
  await Detail.create({
    title: fromFEArticle.title,
    descriptions: fromFEArticle.descriptions,
    classifications: fromFEArticle.classifications,
    tags: fromFEArticle.tags,
    pic: 'salmalm.png',
    date: fromFEArticle.date.substring(0, 10),
    content: fromFEArticle.content
  })
  res.send('发布成功');
})


//修改文章
router.post('/updateArticle', auth, async function(req, res) {
  const presentForm = req.body.form;
  const originalForm = req.body.originalForm;
  console.log(req.body);
  // await Detail.updateOne({
  //   title: originalForm.title,
  //   descriptions: originalForm.descriptions
  // }, {
  //   $set: {
  //     title: presentForm.title,
  //     descriptions: presentForm.descriptions
  //   }
  // })
  // res.send('修改成功')
})



// 删除文章
router.get('/deleteArticle/:title', auth, async function(req, res) {
  const title = req.params.title;
  const thisArticle = await Detail.find({
    title: title
  });
  if(thisArticle.length) {
    await Detail.remove({
      title: title
    })
    res.send('删除成功')
  }else {
    res.send('删除失败')
  }
})



// 获取文章列表（timeLine）
router.get('/getAllArticleTitle', auth, async function(req, res) {
  const articleTitleList = await Detail.find();
  if(articleTitleList.length) {
    res.send(articleTitleList);
  }else {
    res.send('获取失败');
  }
})


// 分页获取文章列表
router.get('/getAllArticle', auth, async function(req, res) {
  const urlArr = url.parse(req.url).query.split('&');
  const obj = urlArr.map(item=> item.split('='));
  let currentPage = obj[0][1];
  let pageSize = obj[1][1];
  const skipStr = (currentPage-1)*pageSize;
  const limitStr = pageSize*1;
  const articleList = await Detail.find().skip(skipStr).limit(limitStr);
  const total = await Detail.find().count();
  if(articleList.length && total) {
    res.send({
      articleList,
      total
    });
  }else {
    res.send('当前没有文章')
  }
})


// 点击进入文章详情
router.get('/getArticleDetail/:id', auth, async function(req, res) {
  const title = req.params.id;
  const articleDetail =await Detail.find({
    title: title
  })
  if(articleDetail.length) {
      res.send(articleDetail);
  }else {
    res.status(404).send('页面未找到')
  }
})


// 获取分类
router.get('/getClassifications', auth, async function(req, res) {
  const classificationList = await Classification.find();
  const total = await Classification.find().count();
  if(classificationList.length) {
    res.send({
      classificationList,
      total
    });
  }else {
    res.send('获取失败')
  }
})

// 增加分类
router.get('/addClassification/:name', auth, async function(req, res) {
  const name = req.params.name;
  await Classification.create({
    name: name
  })
  res.send('添加成功')
})


// 修改分类
router.get('/editClassification/:obj', auth, async function(req, res) {
  const names = JSON.parse(req.params.obj);
    const { originalName } = names;
    const { presentName } = names;
    await Classification.updateOne(
      {
        name: originalName
      },
      {
        $set: {
          name: presentName
        }
      }
    )
    res.send('修改成功');
})


// 删除分类
router.get('/delClassification/:obj', auth, async function(req, res) {
  const names = JSON.parse(req.params.obj);
  if(names.length) {
    const delNames = [];
    names.forEach(item=> {
      delNames.push(item.name);
    })
    var nums = delNames.length;
    while(nums>0) {
      const delItem = await Classification.find({
        name: delNames[nums-1]
      })
      if(delItem.length) {
        await Classification.remove({
          name: delNames[nums-1]
        })
      }
      nums--;
    }
    res.send('删除成功');
  }else {
    res.send('请至少选择一个删除项');
  }
})

// 获取标签
router.get('/getTags', auth, async function(req, res) {
  const tags = await Tag.find();
  const total = await Tag.find().count();
  if(tags.length) {
    res.send({
      tags,
      total
    });
  }else {
    res.send('获取失败');
  }
})


// 增加标签
router.get('/addTag/:name', auth, async function(req, res) {
  const name = req.params.name;
  await Tag.create({
    name: name
  })
  res.send('添加成功')
})


// 修改标签
router.get('/editTag/:obj', auth, async function(req, res) {
  const names = JSON.parse(req.params.obj);
    const { originalName } = names;
    const { presentName } = names;
    await Tag.updateOne(
      {
        name: originalName
      },
      {
        $set: {
          name: presentName
        }
      }
    )
    res.send('修改成功');
})


// 删除标签
router.get('/delTag/:obj', auth, async function(req, res) {
  const names = JSON.parse(req.params.obj);
  if(names.length) {
    const delNames = [];
    names.forEach(item=> {
      delNames.push(item.name);
    })
    var nums = delNames.length;
    while(nums>0) {
      const delItem = await Tag.find({
        name: delNames[nums-1]
      })
      if(delItem.length) {
        await Tag.remove({
          name: delNames[nums-1]
        })
      }
      nums--;
    }
    res.send('删除成功');
  }else {
    res.send('请至少选择一个删除项');
  }
})

module.exports = router;
