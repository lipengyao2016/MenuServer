
#Remark
1.目前所有的测试环境请求IP都是经过网关，所以统一走网关的主机和端口，并在URL前面加上menuServer的前缀.

资源列表：

Menu(菜单)

MenuGroup(菜单分组)


#MenuGroup:

Menugroup资源是指用来包含子菜单的菜单目录，主要作分类导航使用。

###1.获取所有菜单分组列表. 

http://localhost:6001/api/v1.0.0/menuGroups

当不传应用系统链接时，默认从JWT中获取。
   
**http**

get

```
{
      applicationHref:"http://192.168.7.210:5000/api/v1.0.0/applications/gwUpBQ3HpXxItT7OcChoCA",
      upLevelMenuGroupUUID:null,   //上级分组的UUID,为空即为取所有的顶级分组。
      expand:'downLevelMenuGroups',
} 
```


**response**


```
{
  "href": "http://localhost:6001/api/v1/menuGroups?applicationHref=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1.0.0%2Fapplications%2FCQZNqVpEbFxyZ7ayW7x2yA",
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
        applicationHref:'http://192.168.7.210:5000/api/v1.0.0/applications/gwUpBQ3HpXxItT7OcChoCA',, //当上级分组链接为空时，必须传此字段。
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

http://localhost:6001/api/v1/treeMenus

**http** 

get

**request**

```
{
   applicationHref:'http://localhost:5000/api/v1.0.0/applications/BQZNqVpEbFxyZ7ayW7x2yA',
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
		"applicationHref": "http://localhost:5000/api/v1.0.0/applications/BQZNqVpEbFxyZ7ayW7x2yA",
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
    applicationHref:"http://192.168.7.210:5000/api/v1.0.0/applications/gwUpBQ3HpXxItT7OcChoCA", //要获取的某个系统下的菜单列表。
}
```


**response**

```
{
  "href": "http://localhost:6001/api/v1/menus?applicationHref=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1.0.0%2Fapplications%2FCQZNqVpEbFxyZ7ayW7x2yA",
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

        // applicationHref:'http://localhost:5000/api/v1.0.0/applications/CQZNqVpEbFxyZ7ayW7x2yA',//当没有选菜单分组时，此系统链接必须填。

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




###5.删除菜单。

http://localhost:6001/api/v1/menus/:menuUUID

**http**

delete

**response**

statusCode=204

