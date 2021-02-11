import csv

finalData = {
}

def getOriginal():
    original = []
    with open('../datasets/sempre_paises_clean.csv', newline='') as f:
        spamreader = csv.reader(f, delimiter=',', quotechar='"')
        for row in spamreader:
            original.append(row)
    return original

def buildFinalData(rowIndex, row):
    label = row[0].split('[')[0][0:-1]
    year = 1961
    for i in range(1, len(row)):
        if(year not in finalData):
            finalData[year] = {}
        
        if(label not in finalData[year]):
            finalData[year][label] = {}

        if(rowIndex % 3 == 0):
            finalData[year][label]['area'] = toFloatOrZero(row[i].replace('.', '').replace(',', '.')) / 1000.0
        elif(rowIndex % 3 == 1):
            finalData[year][label]['producao'] = toFloatOrZero(row[i].replace('.', '').replace(',', '.')) / 1000.0
        elif(rowIndex % 3 == 2):
            finalData[year][label]['produtividade'] = toFloatOrZero(row[i].replace('.', '').replace(',', '.'))

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
    for rowIndex, row in enumerate(original):
        buildFinalData(rowIndex, row)

    # print(finalData)

    exportFinalCsv(finalData)