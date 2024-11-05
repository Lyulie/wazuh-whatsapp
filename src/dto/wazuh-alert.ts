export class WazuhAlert {
    rule_code: string
    rule_level: number
    ip_affected: string
    time: string
    description: string

    stringify() {
        return `A regra ${this.rule_code}, de grau de ameaça ${this.rule_level}, afetou o ip ${this.ip_affected}, em ${this.time}. ${this.description}. Execute as medidas preventivas com urgência!`
    }
}
