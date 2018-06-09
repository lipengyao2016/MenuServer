
#Remark
1.目前所有的测试环境请求IP都是经过网关，所以统一走网关的主机和端口，并在URL前面加上menuServer的前缀.

资源列表：

Menu(菜单)

MenuGroup(菜单分组)

Operator(操作)

MetaMenu(元菜单)

MetaOperator(元操作)


#MenuGroup:

Menugroup资源是指用来包含子菜单的菜单目录，主要作分类导航使用。

###1.获取所有菜单分组列表. 

http://localhost:6001/api/v1.0.0/menuGroups


拥有者链接表明这个菜单组织属于哪个系统，或者哪个业态。
应用链接表明这个菜单组织中的菜单来源于哪个系统。

当不传应用系统链接时，默认从JWT中获取。
当不传拥有者链接时，则ownerHref=applicationHref.
   
**http**

get

```
{
      ownerHref:"http://192.168.7.210:5000/api/v1.0.0/businessFormat/gwUpBQ3HpXxItT7OcChoCA",
      applicationHref:'http://localhost:5000/api/v1.0.0/applications/RQZNqVpEbFxyZ7ayW7x2yA',
      upLevelMenuGroupUUID:null,   //上级分组的UUID,为空即为取所有的顶级分组。
      expand:'downLevelMenuGroups',
} 
```


**response**


```
{
  "href": "http://localhost:6001/api/v1/menuGroups?ownerHref=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1.0.0%2Fapplications%2FCQZNqVpEbFxyZ7ayW7x2yA",
  "offset": 0,
  "limit": 5,
  "size": 5,
  "items": [
    {
      "href": "http://localhost:6001/api/v1.0.0/menuGroups/nOkRK6dZzpLgKTrfdGBaYQ",
      "name": "商品管理",
      "description": "datagg",
      "uiOrder": 5,
      "status": "enabled",
      "createdAt": "2018-05-28 10:39:13",
      "modifiedAt": "2018-05-28 10:39:13",
      "upLevelMenuGroup": {
        "href": "http://localhost:6001/api/v1/menuGroups/eTUA8Knx9e0OMumDevYQ7g"
      },
      "downLevelMenuGroups": {
        "href": "http://localhost:6001/api/v1/menuGroups/nOkRK6dZzpLgKTrfdGBaYQ/downLevelMenuGroups"
      },
      "menuOrganization": {
        "href": "http://localhost:6001/api/v1.0.0/menuOrganizations/rIdUW07jGttn5VNGcPvnuQ"
      },
      "menus": {
        "href": "http://localhost:6001/api/v1.0.0/menuGroups/nOkRK6dZzpLgKTrfdGBaYQ/menus"
      },
      "operators": {
        "href": "http://localhost:6001/api/v1.0.0/menuGroups/nOkRK6dZzpLgKTrfdGBaYQ/operators"
      }
    },
  ]
}
```



###2.新增菜单分组，

http://localhost:6001/api/v1.0.0/menuGroups  

当不传应用系统链接时，默认从JWT中获取。
当不传拥有者链接时，则ownerHref=applicationHref.

**http**

post

**request**

```

{ 
       "name": "平台管理qq",
       "description": "datagg",
        status:"enabled",
        uiOrder: 2,
        upLevelMenuGroupHref:'http://localhost:6001/api/v1.0.0/menuGroups/eTUA8Knx9e0OMumDevYQ7g',
        ownerHref:'http://192.168.7.210:5000/api/v1.0.0/applications/gwUpBQ3HpXxItT7OcChoCA',, //当上级分组链接为空时，必须传此字段。
        applicationHref:'http://localhost:5000/api/v1.0.0/applications/RQZNqVpEbFxyZ7ayW7x2yA',
 };
 
 
```

response:

```

{
  "href": "http://localhost:6001/api/v1.0.0/menuGroups/6cVizWBnkIRlGHCttOmspg",
  "name": "平台管理qq",
  "description": "datagg",
  "uiOrder": 2,
  "status": "enabled",
  "createdAt": "2018-05-29 17:01:44",
  "modifiedAt": "2018-05-29 17:01:44",
  "upLevelMenuGroup": {
    "href": null
  },
  "downLevelMenuGroups": {
    "href": "http://localhost:6001/api/v1/menuGroups/6cVizWBnkIRlGHCttOmspg/downLevelMenuGroups"
  },
  "menuOrganization": {
    "href": "http://localhost:6001/api/v1.0.0/menuOrganizations/PMM7M1sFnSTlDalZXqvPmQ"
  },
  "menus": {
    "href": "http://localhost:6001/api/v1.0.0/menuGroups/6cVizWBnkIRlGHCttOmspg/menus"
  },
  "operators": {
    "href": "http://localhost:6001/api/v1.0.0/menuGroups/6cVizWBnkIRlGHCttOmspg/operators"
  }
}

```



###3.修改菜单分组   

http://localhost:6001/api/v1.0.0/menuGroups/:menuGroupsUUID


**http**

post

**request**

```
{ 
      "name": "平台管理qq",
       "description": "datagg",
       status:"enabled",
       uiOrder: 2,
};
```

**response**

```
{
  "href": "http://localhost:6001/api/v1.0.0/menuGroups/6cVizWBnkIRlGHCttOmspg",
  "name": "平台管理qq",
  "description": "datagg",
  "uiOrder": 2,
  "status": "enabled",
  "createdAt": "2018-05-29 17:01:44",
  "modifiedAt": "2018-05-29 17:01:44",
  "upLevelMenuGroup": {
    "href": null
  },
  "downLevelMenuGroups": {
    "href": "http://localhost:6001/api/v1/menuGroups/6cVizWBnkIRlGHCttOmspg/downLevelMenuGroups"
  },
  "menuOrganization": {
    "href": "http://localhost:6001/api/v1.0.0/menuOrganizations/PMM7M1sFnSTlDalZXqvPmQ"
  },
  "menus": {
    "href": "http://localhost:6001/api/v1.0.0/menuGroups/6cVizWBnkIRlGHCttOmspg/menus"
  },
  "operators": {
    "href": "http://localhost:6001/api/v1.0.0/menuGroups/6cVizWBnkIRlGHCttOmspg/operators"
  }
}
```


###4.删除菜单分组 (如果下面还有子菜单，则不能删除，返回错误码)  

http://localhost:6001/api/v1.0.0/menuGroups/:menuGroupsUUID


**http**

delete

**response**

statusCode=204




#Menu:

Menu资源是指用户主页左侧的导航菜单，用来跳转到具体功能界面。

###1.获取某个系统下的树形结构菜单分组以及菜单列表


当不传应用系统链接时，默认从JWT中获取。
当不传拥有者链接时，则ownerHref=applicationHref.

http://localhost:6001/api/v1/treeMenus

**http** 

get

**request**

```
{
   ownerHref:"http://192.168.7.210:5000/api/v1.0.0/businessFormat/gwUpBQ3HpXxItT7OcChoCA",
   applicationHref:'http://localhost:5000/api/v1.0.0/applications/RQZNqVpEbFxyZ7ayW7x2yA',
}
```


**response**

```
{
	"menuOrganization": {
		"uuid": "PMM7M1sFnSTlDalZXqvPmQ",
		"name": "BQZNqVpEbFxyZ7ayW7x2yA",
		"description": "345dfsf",
		"status": "enabled",
		"ownerHref": "http://localhost:5000/api/v1.0.0/applications/BQZNqVpEbFxyZ7ayW7x2yA",
		"applicationUUID": "BQZNqVpEbFxyZ7ayW7x2yA"
	},
	"subMenuGroups": [{
		"uuid": "qqbbgtjhrtHjD9OaWDqyqw",
		"name": "平台运营",
		"description": "datagg",
		"uiOrder": 1,
		"upLevelMenuGroupUUID": null,
		"status": "enabled",
		"subMenuGroups": [],
		"menus": [{
			"uuid": "oAbogeaLnMyG27XEfJN8cw",
			"name": "门店管理",
			"description": "sadfsaga",
			"type": 0,
			"number": "01",
			"menuId": "4578sdfs875c1",
			"iconHref": null,
			"uiOrder": 2,
			"menuGroupUUID": "qqbbgtjhrtHjD9OaWDqyqw",
			"status": "enabled",
			"operators": [{
				"uuid": "CLuwE6TehKKwCdejCVR5Tw",
				"name": "门店列表",
				"operatorId": "wefasdgsagsc2",
				"uiOrder": 0,
				"menuUUID": "oAbogeaLnMyG27XEfJN8cw",
				"status": "enabled"
			},
			]
		},]
		}]
	},
	]
}

```

###2.列表所有的菜单列表(平行结构)
  此接口列表当前菜单组织下的所有菜单列表，也可以根据部分查询条件对菜单进行查询和过滤。
  当不传应用系统链接时，默认从JWT中获取。

http://localhost:6001/api/v1.0.0/menus

**http** 

get

**request**

```
{
    "name" : "角色管理"   //菜单名称。
    ownerHref:"http://192.168.7.210:5000/api/v1.0.0/applications/gwUpBQ3HpXxItT7OcChoCA", //要获取的某个系统下的菜单列表。
    applicationHref:'http://localhost:5000/api/v1.0.0/applications/RQZNqVpEbFxyZ7ayW7x2yA',
}
```


**response**

```
{
  "href": "http://localhost:6001/api/v1/menus?ownerHref=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1.0.0%2Fapplications%2FCQZNqVpEbFxyZ7ayW7x2yA",
  "offset": 0,
  "limit": 5,
  "size": 5,
  "items": [
    {
      "href": "http://localhost:6001/api/v1.0.0/menus/8vbGikhuHe8gfJLQbxbrFA",
      "description": "sadfsaga",
      "name": "商品库存",
      "type": 0,
      "number": "01",
      "menuId": "4578sdfs875a5",
      "iconHref": null,
      "uiOrder": 2,
      "status": "enabled",
      "createdAt": "2018-05-28 10:53:44",
      "modifiedAt": "2018-05-28 10:53:44",
      "menuOrganization": {
        "href": "http://localhost:6001/api/v1.0.0/menuOrganizations/rIdUW07jGttn5VNGcPvnuQ"
      },
      "menuGroup": {
        "href": "http://localhost:6001/api/v1.0.0/menuGroups/nOkRK6dZzpLgKTrfdGBaYQ"
      },
      "operators": {
        "href": "http://localhost:6001/api/v1.0.0/menus/8vbGikhuHe8gfJLQbxbrFA/operators"
      }
    },

  ]
}

```



###3.新增一个菜单，可同时创建操作

http://localhost:6001/api/v1/menus

批量创建，入参传数组即可，格式一样。
http://localhost:6001/api/v1/menus/batchCreate

**http**

post

**request**

第一种方式:
```
 {
        name: '角色管理qq',
        description: 'sadfsaga',
        type: 0,
        number: '01',
         menuId: '4578sdfs875d4',
         uiOrder:3,
         menuGroupHref:'http://localhost:6001/api/v1.0.0/menuGroups/6cVizWBnkIRlGHCttOmspg',

        // ownerHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',//当没有选菜单分组时，此系统链接必须填。
          applicationHref:'http://localhost:5000/api/v1.0.0/applications/RQZNqVpEbFxyZ7ayW7x2yA',

         operators:[
             {
                 name: '角色列表',
                 operatorId:'wefasdgsagsd8',
             },
             {
                 name: '新增角色',
                 operatorId:'wefasdgsagsd9',
             },
         ],
    }
```


第二种方式:
```
  {
             menuGroupHref:'http://localhost:6001/api/v1.0.0/menuGroups/JZv0qnDunAAcE1U5QGqW7Q',
             metaMenuUUID:'TOSkzGil5QL1c7JyA9UT9g',  //元菜单UUID.
             bCreatedOperators:true,                 //是否同时创建元菜单下的所有操作。
  },
```




批量创建:
```
[
        {
            menuGroupHref:'http://192.168.7.26:6001/api/v1.0.0/menuGroups/pH5VbOp461o6HuR7AVarBg',  //平台管理。
            metaMenuUUID:'RAgiDDPYvHZCSRPnqDzc7w',
            bCreatedOperators:true,
        },
        {
            menuGroupHref:'http://192.168.7.26:6001/api/v1.0.0/menuGroups/pH5VbOp461o6HuR7AVarBg',
            metaMenuUUID:'53pfufyf36v6J42nrYhEZQ',
            bCreatedOperators:true,
        },
]
```

**response**

```
{
  "href": "http://localhost:6001/api/v1.0.0/menus/4pvfQY0lNRt4TfHb6nGMbQ",
  "description": "sadfsaga",
  "name": "角色管理qq",
  "type": 0,
  "number": "01",
  "menuId": "4578sdfs875d4",
  "iconHref": null,
  "uiOrder": 3,
  "status": "enabled",
  "createdAt": "2018-05-29 17:15:40",
  "modifiedAt": "2018-05-29 17:15:40",
  "menuOrganization": {
    "href": "http://localhost:6001/api/v1.0.0/menuOrganizations/PMM7M1sFnSTlDalZXqvPmQ"
  },
  "menuGroup": {
    "href": "http://localhost:6001/api/v1.0.0/menuGroups/6cVizWBnkIRlGHCttOmspg"
  },
  "operators": {
    "href": "http://localhost:6001/api/v1.0.0/menus/4pvfQY0lNRt4TfHb6nGMbQ/operators"
  }
}
```


###4.编辑菜单(交互上的菜单编号无用),修改菜单名称，分组，以及状态

http://localhost:6001/api/v1/menus/:menuUUID

**http**

post

**request**

```
{
        name: '角色管理qq',
        description: 'sadfsaga',
        type: 0,
        number: '01',
         menuId: '4578sdfs875d4',
         uiOrder:3,
         menuGroupHref:'http://localhost:6001/api/v1.0.0/menuGroups/6cVizWBnkIRlGHCttOmspg',
         operators:[
             {
                 name: '角色列表',
                 operatorId:'wefasdgsagsd8',
             },

         ],
    }
```

**response**

```
{
  "href": "http://localhost:6001/api/v1.0.0/menus/4pvfQY0lNRt4TfHb6nGMbQ",
  "description": "sadfsaga",
  "name": "角色管理qq",
  "type": 0,
  "number": "01",
  "menuId": "4578sdfs875d4",
  "iconHref": null,
  "uiOrder": 3,
  "status": "enabled",
  "createdAt": "2018-05-29 17:15:40",
  "modifiedAt": "2018-05-29 17:15:40",
  "menuOrganization": {
    "href": "http://localhost:6001/api/v1.0.0/menuOrganizations/PMM7M1sFnSTlDalZXqvPmQ"
  },
  "menuGroup": {
    "href": "http://localhost:6001/api/v1.0.0/menuGroups/6cVizWBnkIRlGHCttOmspg"
  },
  "operators": {
    "href": "http://localhost:6001/api/v1.0.0/menus/4pvfQY0lNRt4TfHb6nGMbQ/operators"
  }
}
```



###5.批量更新菜单信息

http://localhost:6001/api/v1/menus/batchUpdate

**http**

post

**request**

```
{
                uuid:['mzNYalrUcBWrGsbxEsQcAQ','8KMwPfurIZoEHfENAShS6g'],
                description:'ccc',
                menuGroupUUID:'Y9ItzadYabvitqDcPHZpUQ',
            }
```

**response**

```
[
  {
    "href": "http://localhost:6001/api/v1.0.0/menus/mzNYalrUcBWrGsbxEsQcAQ",
    "description": "ccc",
    "name": null,
    "type": 0,
    "number": null,
    "menuId": null,
    "iconHref": null,
    "uiOrder": 0,
    "status": "enabled",
    "createdAt": null,
    "modifiedAt": "2018-06-06 11:03:01",
    "menuOrganization": {
      "href": "http://localhost:6001/api/v1.0.0/menuOrganizations/undefined"
    },
    "menuGroup": {
      "href": "http://localhost:6001/api/v1.0.0/menuGroups/Y9ItzadYabvitqDcPHZpUQ"
    },
    "operators": {
      "href": "http://localhost:6001/api/v1.0.0/menus/mzNYalrUcBWrGsbxEsQcAQ/operators"
    }
  },
  {
    "href": "http://localhost:6001/api/v1.0.0/menus/8KMwPfurIZoEHfENAShS6g",
    "description": "ccc",
    "name": null,
    "type": 0,
    "number": null,
    "menuId": null,
    "iconHref": null,
    "uiOrder": 0,
    "status": "enabled",
    "createdAt": null,
    "modifiedAt": "2018-06-06 11:03:01",
    "menuOrganization": {
      "href": "http://localhost:6001/api/v1.0.0/menuOrganizations/undefined"
    },
    "menuGroup": {
      "href": "http://localhost:6001/api/v1.0.0/menuGroups/Y9ItzadYabvitqDcPHZpUQ"
    },
    "operators": {
      "href": "http://localhost:6001/api/v1.0.0/menus/8KMwPfurIZoEHfENAShS6g/operators"
    }
  }
]
```


###6.删除菜单。

http://localhost:6001/api/v1/menus/:menuUUID

**http**

delete

**response**

statusCode=204


#Operator:

Operator资源是指界面上的具体按钮功能。

###1.创建操作

http://localhost:6001/api/v1/operators

批量创建，入参传数组即可，格式一样。
http://localhost:6001/api/v1/operators/batchCreate

**http**

post

**request**

第一种方式:
```
 {
       name:'添加商户',
       operatorId:'45ertedfg34',
       uiOrder:2,
        menuHref: 'http://localhost:6001/api/v1.0.0/menus/PWLhNmRHYuAaGeKrWuasrQ', //所属的菜单链接。
    }
```


第二种方式:
```
  {
         menuHref: 'http://localhost:6001/api/v1.0.0/menus/PWLhNmRHYuAaGeKrWuasrQ',
         metaOperatorUUID:'LrmWXTvdcnSQhCopNVM4NQ',   //元操作UUID.
  },
```

**response**

```
{
  "href": "http://localhost:6001/api/v1.0.0/operators/H50Eki2dcEAcVrpXuifRaA",
  "name": "添加菜单",
  "operatorId": "45ertedfg04",
  "uiOrder": 0,
  "status": "enabled",
  "createdAt": "2018-06-07 17:38:02",
  "modifiedAt": "2018-06-07 17:38:02",
  "menu": {
    "href": "http://localhost:6001/api/v1.0.0/menus/Arm6qwTn9UIpzkj70gnRrA"
  }
}
```

#MetaMenu:

MetaMenu资源是指由前端系统开发的功能模块菜单。

###1.列表元菜单

http://localhost:6001/api/v1.0.0/metaMenus

**http**

get

**request**

```
{
    applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA', //要获取的某个系统下的菜单列表。
}
```


**response**

```
{
  "href": "http://localhost:6001/api/v1/metaMenus?ownerHref=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1.0.0%2Fapplications%2FCQZNqVpEbFxyZ7ayW7x2yA",
  "offset": 0,
  "limit": 5,
  "size": 5,
  "items": [
    {
      "href": "http://localhost:6001/api/v1.0.0/metaMenus/rx6BA4IqXIMSCni5aW53fg",
      "name": "业态管理",
      "menuId": "4578sdfs875d6",
      "status": "enabled",
      "createdAt": "2018-06-07 16:41:14",
      "modifiedAt": "2018-06-07 16:41:14",
      "menuOrganization": {
        "href": "http://localhost:6001/api/v1.0.0/menuOrganizations/ycfqUhnlAEhxxfRqu5Vyqg"
      },
      "metaOperators": {
        "href": "http://localhost:6001/api/v1.0.0/metaMenus/rx6BA4IqXIMSCni5aW53fg/metaOperators"
      }
    },
  ]
}

```