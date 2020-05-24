/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-24 22:01:41
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-24 22:06:28
 * @FilePath: /LagoWorks/LearnTS.ts
 * @Description: 
 */ 

 interface ICar{
   branch(branch:string):string
 }

 abstract class  Car implements ICar{
   branch(branch: string): string {
     return "Car 的品牌 是"+branch
   }

   abstract run(km:number):void
 }

 class Audi extends Car {
   run(km: number): void {
     console.log("跑起来...")
     console.log(this.branch("Audi"))
   }
  
  


 }