#include "testsystemform.h"
#include "ui_testsystemform.h"

TestSystemForm::TestSystemForm(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::TestSystemForm)
{
    ui->setupUi(this);
    //设置自由分割条位置
    {
        ui->listWidget->setMaximumSize(16777215,16777215);
        QList<int> list_src;
        list_src.append(200);
        list_src.append(552);
        ui->horizontalSplitter->setSizes(list_src);//设置水平分隔条比例
        QList<int> list_src2;
        list_src2.append(350);
        list_src2.append(177);
        ui->VerticalSplitter->setSizes(list_src2);//设置垂直分隔条比例
    }
    QPalette palette;
    palette.setColor(QPalette::Background, QColor(99,176,176));//暗青色
    ui->listWidget->setPalette(palette);
    palette.setColor(QPalette::Background, QColor(138,138,46));//土黄色
    ui->logWidget->setPalette(palette);
    palette.setColor(QPalette::Background, QColor(102,204,102));//绿色
  //  ui->functionWidget->setPalette(palette);
    palette.setColor(QPalette::Background, QColor(102,153,204));//淡蓝色
    ui->mainWidget->setPalette(palette);
}

TestSystemForm::~TestSystemForm()
{
    delete ui;
}

void TestSystemForm::on_editPushButton_clicked()
{
//    if( T_commonform->serialPortA->isOpen())
//    {
//        QString str="今天天气很好！！！";
//        QTextCodec *codec = QTextCodec::codecForName("utf8"); //建立一个unicode与utf8之间的转换器
//        QByteArray byt=codec->fromUnicode(str); //unicode转换成utf8
//        T_commonform->serialPortA->write(byt);
//    }
    ui->testTimeLineEdit->clear();
    ui->testTimeLineEdit->tr("sddg");
}
