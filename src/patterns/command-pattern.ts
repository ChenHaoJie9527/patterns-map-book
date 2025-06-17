/**
 * Command Pattern
 * 这是一个在线食品配送平台，
 * 可以下单，追踪，取消订单，这是没有问题，然后随着项目的发展，订单越来越多，订单的种类也越来越多，订单的取消，追踪，下单，这些操作越来越复杂，越来越难以维护
 * 可能曾经使用到的某些方法名出现修改，或者某些方法需要添加参数，那么使用的成本也会随之增加
 * 这时候就可以使用命令模式来解决这个问题, 这意味着操作方法与执行方法分离解耦
 * 命令模式就是将这些操作封装成命令，然后使用命令来执行这些操作
 */

export class OrderManager {
  orders: Array<number> = [];
  constructor() {
    this.orders = [];
  }

  placeOrder(order: string, id: number) {
    this.orders.push(id);

    return `You have successfully ordered ${order} (${id})`;
  }

  trackOrder(id: number) {
    return `Your orders ${id} will arrive in 20 minutes`;
  }

  cancelOrder(id: number) {
    this.orders = this.orders.filter((order) => order !== id);

    return `You have successfully canceled your order ${id}`;
  }

  // ... 还有很多其他操作，比如支付，评价，等等
}

// 使用命令模式重构 v2

type CommandType = {
  execute: (orders: Array<number>, ...args: any[]) => string;
};
export class OrderManagerV2 {
  orders: Array<number> = [];

  execute(command: CommandType, ...args: any[]) {
    return command.execute(this.orders, ...args);
  }
}

class Command implements CommandType {
  execute: (orders: Array<number>, ...args: any[]) => string;
  constructor(execute: CommandType["execute"]) {
    this.execute = execute;
  }
}

// 工厂模式创建命令, 创建命令的工厂
export function placeOrderCommand(order: any, id: number) {
  return new Command((orders) => {
    orders.push(id);
    return `You have successfully ordered ${order} (${id})`;
  });
}
