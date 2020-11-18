import csv

finalData = {
}

def getOriginal():
    original = []
    with open('../datasets/sempre_estados_clean.csv', newline='') as f:
        spamreader = csv.reader(f, delimiter=',', quotechar='"')
        for row in spamreader:
            original.append(row)
    return original

def buildFinalData(row):
    label = row[0]
    year = 1976
    for i in range(1, len(row), 3):
        if(year not in finalData):
            finalData[year] = {}
        
        if(label not in finalData[year]):
            finalData[year][label] = {}

        finalData[year][label]['area'] = toFloatOrZero(row[i].replace('.', '').replace(',', '.'))
        finalData[year][label]['produtividade'] = toFloatOrZero(row[i+1].replace('.', '').replace(',', '.'))
        finalData[year][label]['producao'] = toFloatOrZero(row[i+2].replace('.', '').replace(',', '.'))

        year += 1

def toFloatOrZero(val):
    try:
        return float(val)
    except (ValueError, TypeError):
        return 0

def exportFinalCsv(finalData):
    with open("final.csv", 'w') as f:
        spamwriter = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

        header = ['Date']
        for sigla in finalData[1976]:
            header += [sigla, sigla + "_1", sigla + "_2"]

        spamwriter.writerow(header)

        for year in finalData:
            line = [str(year) + "-01-01"]
            for sigla in finalData[year]:
                print(sigla)
                line += [
                    finalData[year][sigla]['producao'],
                    finalData[year][sigla]['area'],
                    finalData[year][sigla]['produtividade'],
                ]
            spamwriter.writerow(line)


if __name__ == "__main__":
    original = getOriginal()[1:]
    for row in original:
        buildFinalData(row)

    # print(finalData)

    exportFinalCsv(finalData)