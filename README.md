# Rocket Angel

## Preface

![](https://static.wikia.nocookie.net/cnc/images/4/4a/Rocket_angel.jpg/revision/latest/scale-to-width-down/200?cb=20130619044039)

`Rocket Angel` is originally from 「Conmand & Conquer: Red Alert 3」, one small but powerful unit:

<iframe src="//player.bilibili.com/player.html?aid=838761520&bvid=BV12g4y1v7gA&cid=211828236&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

But here, It's a template of backstage admin app based on [Vuetify Admin](https://github.com/boring-plans/vuetify-admin) and [Flask Boot](https://github.com/boring-plans/flast-boot).

## Build & Deploy

In folder vuetify, run:

```shell
yarn && yarn build
```

Then:

```shell
docker-compose up -d
```

Then, we can visit `http://localhost:2022`.
