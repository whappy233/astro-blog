---
title: '动态添加方法'
date: 2025-07-23
tags: ['code']
authors: ['carlos']
draft: true
---

```python
import types

class MyClass:
    value = 100

    def __init__(self, value):
        self.value = value

    def original_method(self):
        return f"Original method called with value: {self.value}"

def dynamic_method(self):
    return f"Dynamic method called with value: {self.value}"

# 为类添加实例方法
MyClass.dynamic_method = dynamic_method

# 为类添加类方法
MyClass.dynamic_method = types.MethodType(dynamic_method, MyClass)

# 在实例上添加实例方法(仅对该实例生效)
my_instance = MyClass(5)
setattr(my_instance, 'dynamic_method', types.MethodType(dynamic_method, my_instance))

# 在实例上添加静态方法(仅对该实例生效)
my_instance = MyClass(5)
my_instance.my_instance = dynamic_method
```
