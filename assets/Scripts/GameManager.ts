import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

// 赛道类型
enum BlockType {
    BT_NONE,
    BT_STONE,
}

@ccclass('GameManager')
export class GameManager extends Component {
    // 赛道预置
    @property({ type: Prefab })
    public cubePrfb: Prefab | null = null;

    // 赛道长度
    @property
    public roadLength = 50;
    private _road: BlockType[] = [];
    start() {
        this.generateRoad();
    }
    // 生成赛道
    generateRoad() {
        // 清空地图
        this.node.removeAllChildren();
        this._road = [];
        // 确保一开始一定为路
        this._road.push(BlockType.BT_STONE);

        // 确保坑不会连续出现
        for (let i = 0; i < this.roadLength; i++) {
            if (this._road[i - 1] === BlockType.BT_NONE) {
                this._road.push(BlockType.BT_STONE);
            } else {
                this._road.push(Math.floor(Math.random() * 2));
            }
        }

        // 根据赛道类型数组生成地图数据
        for (let j = 0; j < this._road.length; j++) {
            let block: Node = this.spawnBlockByType(this._road[j]);
            if (block) {
                this.node.addChild(block);
                block.setPosition(j, -1.5, 0);
            }
        }
    }
    spawnBlockByType(type: BlockType) {
        if (!this.cubePrfb) {
            return null;
        }
        let block: Node | null = null;
        switch (type) {
            case BlockType.BT_STONE:
                block = instantiate(this.cubePrfb);
                break;
        }
        return block;
    }
    update(deltaTime: number) {}
}
