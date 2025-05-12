/**
 * 接口响应code值枚举
 */
export const enum CodeEnum {
  SUCCESS = 200, // 操作成功
  NOT_LOGIN = 401, // 未登陆
}

/**
 * HTTP响应状态码枚举 补充见 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
 */
export const enum HttpStatus {
  /** 请求成功 */
  OK = 200,
  /** 由于被认为是客户端错误（例如，错误的请求语法、无效的请求消息帧或欺骗性的请求路由），服务器无法或不会处理请求。 */
  'Bad Request' = 400,
  /** 虽然 HTTP 标准指定了"unauthorized"，但从语义上来说，这个响应意味着"unauthenticated"。也就是说，客户端必须对自身进行身份验证才能获得请求的响应。 */
  Unauthorized = 401,
  /** 客户端没有访问内容的权限；也就是说，它是未经授权的，因此服务器拒绝提供请求的资源。与 401 Unauthorized 不同，服务器知道客户端的身份。 */
  Forbidden = 403,
  /** 服务器找不到请求的资源。在浏览器中，这意味着无法识别 URL。在 API 中，这也可能意味着端点有效，但资源本身不存在。服务器也可以发送此响应，而不是 403 Forbidden，以向未经授权的客户端隐藏资源的存在。这个响应代码可能是最广为人知的，因为它经常出现在网络上。 */
  'Not Found' = 404,
  /** 服务器知道请求方法，但目标资源不支持该方法。例如，API 可能不允许调用DELETE来删除资源。 */
  'Method Not Allowed' = 405,
  /** 当 web 服务器在执行服务端驱动型内容协商机制后，没有发现任何符合用户代理给定标准的内容时，就会发送此响应。 */
  /** 服务器遇到了不知道如何处理的情况。 */
  'Internal Server Error' = 500,
}
