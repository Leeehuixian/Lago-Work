/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-26 21:47:16
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-26 22:00:53
 * @FilePath: /TypeScript/src/06-enum-types.ts
 * @Description: 枚举类型
 */ 

export {}

const enum PostStatus {
  Draft = 0,
  Published = 1,
  UnPublished = 2
}

const post = {
  title: '月亮和六便士',
  status: PostStatus.Draft
}