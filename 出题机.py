import time
import random

def str_ls(str_num,argument):
    for x in str_num:
        print(x,end='')
        time.sleep(0.05)
    if argument:
        print()

def if_int(num):
    try:
        int(num)
        return "True"
    except ValueError:
        return "False"
    except Exception as e:
        return e
        
def main():
    str_ls("你好，我是你的出题AI-GMP",True)
    grade = input("你的年级是：")
    return_grade = if_int(grade)
    if return_grade == "True":
        grade = int(grade)
        if grade == 7:
            str_ls("一辆巡逻车从岗亭出发(岗亭记为原点0),规定向东为正、向西为负.巡逻车在一段时间内的行驶记录如下(单位:千米):\n",True)
            for x in range(random.randint(4, 10)):
                num1 = random.randint(-20, 20)
                if num1 > 0:
                    num1 = "+" + str(num1)
                else:
                    num1 = str(num1)
                str_ls(f"{num1}、",False)
            num1 = random.randint(-20, 20)
            if num1 > 0:
                    num1 = "+" + str(num1)
            else:
                num1 = str(num1)
            str_ls(num1,True)
            str_ls("\n(1)巡逻车最后停在什么位置?在岗亭的哪个方向,并且有多远？\n\n(2)这次巡逻一共行驶了多少千米?\n\n(3)若巡逻车每千米耗油 0.1 升,这次巡逻共耗油多少升?",True)
        elif grade <= 0:
            print("请不要输入不合法的年级")
        else:
            print("对不起，目前未录入该年级的题目！")
    elif return_grade == "False":
        print("请输入整数")
    else:
        print(f"抱歉，发生了其它故障，原因是：{return_grade}")

if __name__ == "__main__":
    main()
