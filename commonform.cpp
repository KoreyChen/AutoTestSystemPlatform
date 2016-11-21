#include "commonform.h"
#include "ui_commonform.h"

CommonForm::CommonForm(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::CommonForm)
{
    ui->setupUi(this);
    ui->comBFrame->setVisible(false);

    QPalette palette;
    palette.setColor(QPalette::Background, QColor(198,236,217));//暗青色
    ui->comASetFrame->setPalette(palette);
    ui->comAFrame->setPalette(palette);
    palette.setColor(QPalette::Background, QColor(217,236,198));//暗青色
    ui->comBSetFrame->setPalette(palette);
    ui->comBFrame->setPalette(palette);
    ui->comBCharReceiveRadioButton->setChecked(true);
    ui->comACharReceiveRadioButton->setChecked(true);
    ui->comBCharSendRadioButton->setChecked(true);
    ui->comACharSendRadioButton->setChecked(true);

    serialPortA=new QSerialPort();
    serialPortB=new QSerialPort();
    serialInfo =new QSerialPortInfo();
    comAOpenStatus=false;
    comBOpenStatus=false;
    comACharSend=true;
    comACharShow=true;
    comBCharSend=true;
    comBCharShow=true;
    comAReciveDataCount=0;
    comBReciveDataCount=0;
    comASendDataCount=0;
    comBSendDataCount=0;
    foreach (*serialInfo, QSerialPortInfo::availablePorts())
    {
        qDebug() << "Name        : " << serialInfo->portName();
        qDebug() << "Description : " << serialInfo->description();
        qDebug() << "Manufacturer: " << serialInfo->manufacturer();

        QString comname= (serialInfo->portName())+" ("+(serialInfo->description())+')';
        ui->comANumComboBox->addItem(comname);
        ui->comBNumComboBox->addItem(comname);
    }

    connect(serialPortA, SIGNAL(readyRead()), this, SLOT(slotRedComAData()));
    connect(serialPortB, SIGNAL(readyRead()), this, SLOT(slotRedComBData()));

    comATimer=new QTimer(this);
    comBTimer=new QTimer(this);
    connect(comATimer,SIGNAL(timeout()),this,SLOT(comATimerSlot()));
    connect(comBTimer,SIGNAL(timeout()),this,SLOT(comBTimerSlot()));

    ui->comASendTextEdit->installEventFilter(this);//安装事件
    ui->comBSendTextEdit->installEventFilter(this);//安装事件
}

CommonForm::~CommonForm()
{
    delete ui;
}

void CommonForm::resetScreenShow()
{
    //重设部分分辨率以满足低分辨率下使用
    if((screen_width<=1920)&&(screen_hight<=1080)) //低分辨的情况下
    {
        ui->comSetingTabWidget->setMinimumWidth(180);
        ui->comSetingTabWidget->setMaximumWidth(180);
    }
    //重设分辨率完
}

void CommonForm::on_hideSetingPushButton_clicked()
{
    if((ui->hideSetingPushButton->text())=="隐藏设置窗")
    {
        ui->hideSetingPushButton->setText("显示设置窗");
        ui->comSetingTabWidget->hide();
    }else if((ui->hideSetingPushButton->text())=="显示设置窗")
    {
        ui->hideSetingPushButton->setText("隐藏设置窗");
        ui->comSetingTabWidget->setVisible(true);
    }

}

void CommonForm::on_selectViewComboBox_currentIndexChanged(int index)
{
    switch(index)
    {
    case 0: ui->comAFrame->setVisible(true);
            ui->comBFrame->setVisible(false);
            break;
    case 1: ui->comAFrame->setVisible(false);
            ui->comBFrame->setVisible(true);
            break;
    case 2: ui->comAFrame->setVisible(true);
            ui->comBFrame->setVisible(true);
            break;
    default: break;
    }
}

void CommonForm::on_comAModelChangePushButton_clicked()
{
    if(ui->comAModelChangePushButton->text()=="调试模式")
    {
        //ui->comAFrame->setVisible(true);
        ui->comASendPushButton->setVisible(false);
       // ui->comASendTextEdit->setVisible(false);
        ui->comAModelChangePushButton->setText("终端模式");

       ui->comADataTextEdit->setStyleSheet("QTextEdit{background: Black }");
       ui->comASendTextEdit->setStyleSheet("QTextEdit{background: Black }");
       QPalette palette;
       palette.setColor(QPalette::Text, Qt::white);
       ui->comADataTextEdit->setPalette(palette);
       ui->comASendTextEdit->setPalette(palette);
       ui->comADataTextEdit->setReadOnly(false);
    }else if(ui->comAModelChangePushButton->text()=="终端模式")
    {
       // ui->comAFrame->setVisible(true);
        ui->comASendPushButton->setVisible(true);
       // ui->comASendTextEdit->setVisible(true);
        ui->comAModelChangePushButton->setText("调试模式");
        ui->comADataTextEdit->setStyleSheet("QTextEdit{background: White }");
        ui->comASendTextEdit->setStyleSheet("QTextEdit{background: White }");
        QPalette palette;
        palette.setColor(QPalette::Text, Qt::black);
        ui->comADataTextEdit->setPalette(palette);
        ui->comASendTextEdit->setPalette(palette);
        ui->comADataTextEdit->setReadOnly(false);
    }
}

void CommonForm::on_comBModelChangePushButton_clicked()
{
    if(ui->comBModelChangePushButton->text()=="调试模式")
    {
        //ui->comAFrame->setVisible(true);
        ui->comBSendPushButton->setVisible(false);
        //ui->comBSendTextEdit->setVisible(false);
        ui->comBModelChangePushButton->setText("终端模式");

        ui->comBDataTextEdit->setStyleSheet("QTextEdit{background: Black }");
        ui->comBSendTextEdit->setStyleSheet("QTextEdit{background: Black }");
        QPalette palette;
        palette.setColor(QPalette::Text, Qt::white);
        ui->comBSendTextEdit->setPalette(palette);
        ui->comBDataTextEdit->setPalette(palette);
       // ui->comBDataTextEdit->setTextInteractionFlags(Qt::TextInteractionFlag::TextEditable);
        ui->comBDataTextEdit->setReadOnly(true);
    }else if(ui->comBModelChangePushButton->text()=="终端模式")
    {
       // ui->comAFrame->setVisible(true);
        ui->comBSendPushButton->setVisible(true);
        //ui->comBSendTextEdit->setVisible(true);
        ui->comBModelChangePushButton->setText("调试模式");

        ui->comBDataTextEdit->setStyleSheet("QTextEdit{background: White }");
        ui->comBSendTextEdit->setStyleSheet("QTextEdit{background: White }");
        QPalette palette;
        palette.setColor(QPalette::Text, Qt::black);
        ui->comBDataTextEdit->setPalette(palette);
         ui->comBSendTextEdit->setPalette(palette);
        ui->comBDataTextEdit->setReadOnly(true);
    }
}

void CommonForm::getComASetting()
{
    QString str=ui->comANumComboBox->currentText();
    QString comname=str.mid(0,4);
    comname.replace(" ","");
    comAName=comname;

    str=ui->comABaudRateComboBox->currentText();
    comABaudRate=str.toInt();

    str=ui->comAStopBitComboBox->currentText();

    if(str=="1")
    {
        comAStopBits=QSerialPort::OneStop;
    }else
        if(str=="1.5")
        {
            comAStopBits=QSerialPort::OneAndHalfStop;
        }else
            if(str=="2")
            {
                comAStopBits=QSerialPort::TwoStop;
            }else
                comAStopBits= QSerialPort::UnknownStopBits;

    str=ui->comACheckBitComboBox->currentText();
    if(str=="无")
        {
            comADataParity=QSerialPort::NoParity;
        }else if(str=="偶校验")
                comADataParity=QSerialPort::EvenParity;
                else if(str=="奇校验")
                    comADataParity=QSerialPort::OddParity;
                    else
                    comADataParity=QSerialPort::NoParity;

    str=ui->comAdataBitComboBox->currentText();
    if(str=="8")  comADataBits=QSerialPort::Data8;
    else if(str=="7") comADataBits=QSerialPort::Data7;

    comAReadBufferSize=4096;

    if(ui->comACharReceiveRadioButton->isChecked())
    {
        comACharShow=true;
    }else
        comACharShow=false;
}
void CommonForm:: setComA()
{
    serialPortA->setPortName(comAName);
    serialPortA->setBaudRate(comABaudRate);
    serialPortA->setDataBits(comADataBits);
    serialPortA->setParity(comADataParity);
    serialPortA->setStopBits(comAStopBits);
    serialPortA->setFlowControl(QSerialPort::NoFlowControl);
    serialPortA->setReadBufferSize(comAReadBufferSize);
    //serialPortA->waitForReadyRead(1000);
}
void CommonForm:: setComB()
{
    serialPortB->setPortName(comBName);
    serialPortB->setBaudRate(comBBaudRate);
    serialPortB->setDataBits(comBDataBits);
    serialPortB->setParity(comBDataParity);
    serialPortB->setStopBits(comBStopBits);
    serialPortB->setFlowControl(QSerialPort::NoFlowControl);
    serialPortB->setReadBufferSize(comBReadBufferSize);
    //serialPortA->waitForReadyRead(1000);
}
void CommonForm::getComBSetting()
{
    QString str=ui->comBNumComboBox->currentText();
    QString comname=str.mid(0,4);
    comname.replace(" ","");
    comBName=comname;

    str=ui->comBBaudRateComboBox->currentText();
    comBBaudRate=str.toInt();

    str=ui->comBStopBitComboBox->currentText();

    if(str=="1")
    {
        comBStopBits=QSerialPort::OneStop;
    }else
        if(str=="1.5")
        {
            comBStopBits=QSerialPort::OneAndHalfStop;
        }else
            if(str=="2")
            {
                comBStopBits=QSerialPort::TwoStop;
            }else
                comBStopBits= QSerialPort::UnknownStopBits;

    str=ui->comBCheckBitComboBox->currentText();
    if(str=="无")
        {
            comBDataParity=QSerialPort::NoParity;
        }else if(str=="偶校验")
                comBDataParity=QSerialPort::EvenParity;
                else if(str=="奇校验")
                    comBDataParity=QSerialPort::OddParity;
                    else
                    comBDataParity=QSerialPort::NoParity;

    str=ui->comBdataBitComboBox->currentText();
    if(str=="8")  comBDataBits=QSerialPort::Data8;
    else if(str=="7") comBDataBits=QSerialPort::Data7;

    comBReadBufferSize=4096;
    if(ui->comBCharReceiveRadioButton->isChecked())
    {
        comBCharShow=true;
    }else
        comBCharShow=false;


}
void CommonForm::comAStatusShow(QString *str)
{
    ui->comAStatusLabel->setText("串口A状态："+*str);
}
void CommonForm::comBStatusShow(QString *str)
{
    ui->comBStatusLabel->setText("串口B状态："+*str);
}

void CommonForm::on_comAOpenPushButton_clicked()
{

    if(ui->comAOpenPushButton->text()=="打开串口")
    {
        getComASetting();//获取设置信息
        setComA();
       if((serialPortA->isOpen())||((comBOpenStatus)&&(comAName==comBName)))
       {
            QMessageBox *mesA=new QMessageBox();
            mesA->setWindowTitle("ERROR");
            QIcon er;
            er.addFile(QStringLiteral(":/new/icon/images/error.ico"), QSize(), QIcon::Normal, QIcon::Off);
            mesA->setWindowIcon(er);
            mesA->setText("该串口已打开，请重新选择其他串口！");
            mesA->show();
            return;
       }else
       {
           if(serialPortA->open(QSerialPort::ReadWrite))
           {
               comAOpenStatus=true;
               QPixmap green;
               green.load(QStringLiteral(":/new/icon/images/green16.ico"));
               ui->comAStatuesImg->setPixmap(green);
               QString str="串口已打开";
               comAStatusShow(&str);


               ui->comAOpenPushButton->setText("关闭串口");

               ui->comABaudRateComboBox->setEnabled(false);
               ui->comACheckBitComboBox->setEnabled(false);
               ui->comAdataBitComboBox->setEnabled(false);
               ui->comANumComboBox->setEnabled(false);
               ui->comAStopBitComboBox->setEnabled(false);



           }else
           {
               QString str="打开串口失败";
               comAStatusShow(&str);
           }
       }

       // this->ComAOpenColor=ui->comAOpenPushButton->backgroundRole();
       // ui->comAOpenPushButton->setStyleSheet("background:Green");


    }else
        if(ui->comAOpenPushButton->text()=="关闭串口")
        {
            if(serialPortA->isOpen())
            {
                serialPortA->clear();
                serialPortA->close();
                comAOpenStatus=false;
                QPixmap red;
                red.load(QStringLiteral(":/new/icon/images/red16.ico"));
                ui->comAStatuesImg->setPixmap(red);
                QString str="串口已关闭";
                comAStatusShow(&str);
             }
            // ui->comAOpenPushButton->setStyleSheet("background:White");
            ui->comAOpenPushButton->setText("打开串口");

            ui->comABaudRateComboBox->setEnabled(true);
            ui->comACheckBitComboBox->setEnabled(true);
            ui->comAdataBitComboBox->setEnabled(true);
            ui->comANumComboBox->setEnabled(true);
            ui->comAStopBitComboBox->setEnabled(true);

            ui->comANumComboBox->clear();
            foreach (*serialInfo, QSerialPortInfo::availablePorts())
            {
                qDebug() << "Name        : " << serialInfo->portName();
                qDebug() << "Description : " << serialInfo->description();
                qDebug() << "Manufacturer: " << serialInfo->manufacturer();

                QString comname= (serialInfo->portName())+" ("+(serialInfo->description())+')';
                ui->comANumComboBox->addItem(comname);
            }
        }
}
void CommonForm::on_comBOpenPushButton_clicked()
{
    if(ui->comBOpenPushButton->text()=="打开串口")
    {
        getComBSetting();
        setComB();
        if((serialPortB->isOpen())||((comAOpenStatus)&&(comAName==comBName)))
        {
            QMessageBox *mesB=new QMessageBox();
            mesB->setText("该串口已打开，请重新选择其他串口！");
            mesB->setWindowTitle("ERROR");
            QIcon er;
            er.addFile(QStringLiteral(":/new/icon/images/error.ico"), QSize(), QIcon::Normal, QIcon::Off);
            mesB->setWindowIcon(er);
            mesB->show();
            return;
        }else
        {
            if(serialPortB->open(QSerialPort::ReadWrite))
            {
                comBOpenStatus=true;
                QPixmap green;
                green.load(QStringLiteral(":/new/icon/images/green16.ico"));
                ui->comBStatuesImg->setPixmap(green);
                QString str="串口已打开";
                comBStatusShow(&str);


                ui->comBOpenPushButton->setText("关闭串口");

                ui->comBBaudRateComboBox->setEnabled(false);
                ui->comBCheckBitComboBox->setEnabled(false);
                ui->comBdataBitComboBox->setEnabled(false);
                ui->comBNumComboBox->setEnabled(false);
                ui->comBStopBitComboBox->setEnabled(false);

            }else
            {
                QString str="打开串口失败";
                comBStatusShow(&str);
            }
        }
       // this->ComBOpenColor=ui->comBOpenPushButton->backgroundRole();
       // ui->comBOpenPushButton->setStyleSheet("background:Green");


    }else
        if(ui->comBOpenPushButton->text()=="关闭串口")
        {
            if(serialPortB->isOpen())
            {
                serialPortB->clear();
                serialPortB->close();
                comBOpenStatus=false;
                QPixmap red;
                red.load(QStringLiteral(":/new/icon/images/red16.ico"));
                ui->comBStatuesImg->setPixmap(red);
                QString str="串口已关闭";
                comBStatusShow(&str);
             }
           // ui->comBOpenPushButton->setStyleSheet("background:White");
            ui->comBOpenPushButton->setText("打开串口");
            ui->comBBaudRateComboBox->setEnabled(true);
            ui->comBCheckBitComboBox->setEnabled(true);
            ui->comBdataBitComboBox->setEnabled(true);
            ui->comBNumComboBox->setEnabled(true);
            ui->comBStopBitComboBox->setEnabled(true);

            ui->comBNumComboBox->clear();
            foreach (*serialInfo, QSerialPortInfo::availablePorts())
            {
                qDebug() << "Name        : " << serialInfo->portName();
                qDebug() << "Description : " << serialInfo->description();
                qDebug() << "Manufacturer: " << serialInfo->manufacturer();

                QString comname= (serialInfo->portName())+" ("+(serialInfo->description())+')';
                ui->comBNumComboBox->addItem(comname);
            }
        }
}

void CommonForm::slotRedComAData()
{
    comARecivedataArry = serialPortA->readAll();
    comAReciveDataCount+=comARecivedataArry.length();
    if(comACharShow)
    {
      comARecivedataArry.replace('\r',' ');
      ui->comADataTextEdit->insertPlainText(comARecivedataArry);
    }else
    {
       QString str;
       foreach(unsigned char ch,comARecivedataArry)
       {
               if(ch<16)
                   str +='0'+QString::number(ch,16).toUpper()+' ';
               else
               str +=QString::number(ch,16).toUpper()+' ';
       }
        ui->comADataTextEdit->insertPlainText(str);
    }
    ui->comAReciveCountLabel->setText(QString::number(comAReciveDataCount,10));

}
void CommonForm::slotRedComBData()
{
    comBRecivedataArry = serialPortB->readAll();
    comBReciveDataCount+=comBRecivedataArry.length();
    if(comBCharShow)
    {
        comBRecivedataArry.replace('\r',' ');
        ui->comBDataTextEdit->insertPlainText(comBRecivedataArry);
    }else
    {
        QString str;
        foreach(unsigned char ch,comBRecivedataArry)
        {
                if(ch<16)
                    str +='0'+QString::number(ch,16).toUpper()+' ';
                else
                str +=QString::number(ch,16).toUpper()+' ';
        }
         ui->comBDataTextEdit->insertPlainText(str);
    }
    ui->comBReciveCountLabel->setText(QString::number(comBReciveDataCount,10));
}

void CommonForm::on_comASendPushButton_clicked()
{
    if(comAOpenStatus)
    {
        QString str=ui->comASendTextEdit->toPlainText();
         QByteArray byt;
        if(comACharSend==true)
        {
            QTextCodec *codec = QTextCodec::codecForName("utf8"); //建立一个unicode与utf8之间的转换器
            byt=codec->fromUnicode(str); //unicode转换成utf8
            serialPortA->write(byt);
        }else
        {
            QStringList tmplist=str.split(" ");
            foreach(QString s,tmplist)
            {
               byt.append(s.toInt(0,16));
            }
            serialPortA->write(byt);
        }
        comASendDataCount += byt.length();
        ui->comASendCountLabel->setText(QString::number(comASendDataCount,10));
    }
}

void CommonForm::on_comBSendPushButton_clicked()
{
    if(comBOpenStatus)
    {
        QString str=ui->comBSendTextEdit->toPlainText();
         QByteArray byt;
        if(comBCharSend==true)
        {
            QTextCodec *codec = QTextCodec::codecForName("utf8"); //建立一个unicode与utf8之间的转换器
            byt=codec->fromUnicode(str); //unicode转换成utf8
            serialPortB->write(byt);
        }else
        {
            QStringList tmplist=str.split(" ");
            foreach(QString s,tmplist)
            {
               byt.append(s.toInt(0,16));
            }
            serialPortB->write(byt);
        }
        comBSendDataCount += byt.length();
        ui->comBSendCountLabel->setText(QString::number(comBSendDataCount,10));
    }
}

void CommonForm::on_comADataTextEdit_textChanged()
{
    QTextCursor cursor =  ui->comADataTextEdit->textCursor();
    cursor.movePosition(QTextCursor::End);
    ui->comADataTextEdit->setTextCursor(cursor);
}

void CommonForm::on_comBDataTextEdit_textChanged()
{
    QTextCursor cursor =  ui->comBDataTextEdit->textCursor();
    cursor.movePosition(QTextCursor::End);
    ui->comBDataTextEdit->setTextCursor(cursor);
}

void CommonForm::on_comBCharReceiveRadioButton_clicked()
{
    if(ui->comBCharReceiveRadioButton->isChecked())
    {
        comBCharShow=true;
    }else
        comBCharShow=false;
}

void CommonForm::on_comACharReceiveRadioButton_clicked()
{
    if(ui->comACharReceiveRadioButton->isChecked())
    {
        comACharShow=true;
    }else
        comACharShow=false;
}

void CommonForm::on_comAHexReceiveRadioButton_clicked()
{
    if(ui->comACharReceiveRadioButton->isChecked())
    {
        comACharShow=true;
    }else
        comACharShow=false;
}

void CommonForm::on_comBHexReceiveRadioButton_clicked()
{
    if(ui->comBCharReceiveRadioButton->isChecked())
    {
        comBCharShow=true;
    }else
        comBCharShow=false;
}

void CommonForm::on_comBHexSendRadioButton_clicked()
{
      if(ui->comBHexSendRadioButton->isChecked())
          comBCharSend=false;
      else
          comBCharSend=true;
}

void CommonForm::on_comAHexSendRadioButton_clicked()
{
    if(ui->comAHexSendRadioButton->isChecked())
        comACharSend=false;
    else
        comACharSend=true;
}

void CommonForm::on_comACharSendRadioButton_clicked()
{
    if(ui->comAHexSendRadioButton->isChecked())
        comACharSend=false;
    else
        comACharSend=true;
}

void CommonForm::on_comBCharSendRadioButton_clicked()
{
    if(ui->comBHexSendRadioButton->isChecked())
        comBCharSend=false;
    else
        comBCharSend=true;
}

void CommonForm::on_comBClearCountPushButton_clicked()
{
    comBReciveDataCount=0;
    comBSendDataCount=0;
    ui->comBSendCountLabel->clear();
    ui->comBReciveCountLabel->clear();
}

void CommonForm::on_comAClearCountPushButton_clicked()
{
    comAReciveDataCount=0;
    comASendDataCount=0;
    ui->comASendCountLabel->clear();
    ui->comAReciveCountLabel->clear();
}

void CommonForm::on_comAClearPushButton_clicked()
{
    ui->comADataTextEdit->clear();
    comAReciveDataCount=0;
    comASendDataCount=0;
    ui->comASendCountLabel->clear();
    ui->comAReciveCountLabel->clear();
}

void CommonForm::on_comBClearPushButton_clicked()
{
    ui->comBDataTextEdit->clear();
    comBReciveDataCount=0;
    comBReciveDataCount=0;
    comBSendDataCount=0;
    ui->comBSendCountLabel->clear();
    ui->comBReciveCountLabel->clear();
}

void CommonForm::on_comAAutoSendCheckBox_clicked()
{
    if(ui->comAAutoSendCheckBox->isChecked())
    {
         if(comAOpenStatus)
         {
             QString str=ui->comASendPeriodLineEdit->text();
             comATimer->start(str.toInt());
         }
    }else
    {
         comATimer->stop();
    }
}
void CommonForm::comATimerSlot()
{
    if(comAOpenStatus)
    {
        QString str=ui->comASendTextEdit->toPlainText();
        QByteArray byt;
        if(comACharSend==true)
        {
            QTextCodec *codec = QTextCodec::codecForName("utf8"); //建立一个unicode与utf8之间的转换器
            byt=codec->fromUnicode(str); //unicode转换成utf8
            serialPortA->write(byt);
        }else
        {
            QStringList tmplist=str.split(" ");
            foreach(QString s,tmplist)
            {
                byt.append(s.toInt(0,16));
            }
            serialPortA->write(byt);
        }
        comASendDataCount += byt.length();
        ui->comASendCountLabel->setText(QString::number(comASendDataCount,10));
    }
}
void CommonForm::comBTimerSlot()
{
    if(comBOpenStatus)
    {
        QString str=ui->comBSendTextEdit->toPlainText();
        QByteArray byt;
        if(comBCharSend==true)
        {
            QTextCodec *codec = QTextCodec::codecForName("utf8"); //建立一个unicode与utf8之间的转换器
            byt=codec->fromUnicode(str); //unicode转换成utf8
            serialPortB->write(byt);
        }else
        {
            QStringList tmplist=str.split(" ");
            foreach(QString s,tmplist)
            {
                byt.append(s.toInt(0,16));
            }
            serialPortB->write(byt);
        }
        comBSendDataCount += byt.length();
        ui->comBSendCountLabel->setText(QString::number(comBSendDataCount,10));
    }
}

void CommonForm::on_comBAutoSendCheckBox_clicked()
{
    if(ui->comBAutoSendCheckBox->isChecked())
    {
         if(comBOpenStatus)
         {
             QString str=ui->comBSendPeriodLineEdit->text();
             comBTimer->start(str.toInt());
         }
    }else
    {
         comBTimer->stop();
    }
}

bool CommonForm::eventFilter(QObject *obj, QEvent *e)
{

    if(obj==ui->comASendTextEdit) // 判断事件发生的对象
    {
        // Q_ASSERT(obj == ui->comADataTextEdit);//不懂这句
        if (e->type() == QEvent::KeyPress)
        {
            QKeyEvent *event = static_cast<QKeyEvent*>(e);
           if (event->key() == Qt::Key_Return)
           {
                if(comAOpenStatus)
                {
//                    char ch=event->key();
//                    serialPortA->write(&ch);
                   // QString str=QString(ch)+"\n";

                   // ui->comADataTextEdit->insertPlainText(str);

                    QString str=ui->comASendTextEdit->toPlainText();
                    str+="\r";
                   // ui->comADataTextEdit->insertPlainText(str);
                    QByteArray byt;
                    QTextCodec *codec = QTextCodec::codecForName("utf8"); //建立一个unicode与utf8之间的转换器
                    byt=codec->fromUnicode(str); //unicode转换成utf8
                    serialPortA->write(byt);
                    comASendDataCount += byt.length();
                    comASendDataCount +=1;
                    ui->comASendCountLabel->setText(QString::number(comASendDataCount,10));
                    ui->comASendTextEdit->clear();
                }
                return true;
           }
        }
    }else
        if(obj == ui->comBSendTextEdit)
        {
            // Q_ASSERT(obj == ui->comBDataTextEdit);//不懂这句
            if (e->type() == QEvent::KeyPress)
            {
                QKeyEvent *event = static_cast<QKeyEvent*>(e);
                if (event->key() == Qt::Key_Return)
                {

                    if(comBOpenStatus)
                    {
                        QString str=ui->comBSendTextEdit->toPlainText();
                        str+='\r';
                      //  ui->comBDataTextEdit->insertPlainText(str+"\r\n");
                        QByteArray byt;
                        QTextCodec *codec = QTextCodec::codecForName("utf8"); //建立一个unicode与utf8之间的转换器
                        byt=codec->fromUnicode(str); //unicode转换成utf8
                        serialPortB->write(byt);
                        comBSendDataCount += byt.length();
                        ui->comBSendCountLabel->setText(QString::number(comBSendDataCount,10));
                         ui->comBSendTextEdit->clear();
                    }
                    return true;
                }
            }
        }
    return false;
}

//char KeyBordInputChar(QKeyEvent *event)
//{
//    char ch;
//    switch (*event)
//    {
//    case Qt::Key_Space: ch=' '; break;
//    case Qt::Key_Exclam: ch='!'; break;
//         case Qt::Key_QuoteDbl: ch='\\'; break;
//         case Qt::Key_NumberSign: ch='#'; break;
//         case Qt::Key_Dollar: ch='$'; break;
//         //case Qt::Key_Apostrophe: ch="'"; break;
//         case Qt::Key_ParenLeft: ch='('; break;
//         case Qt::Key_ParenRight: ch=')'; break;
//         case Qt::Key_Asterisk: ch='*'; break;
//         case Qt::Key_Plus: ch='+'; break;
//         case Qt::Key_Comma: ch=','; break;
//         case Qt::Key_Minus: ch='-'; break;
//         case Qt::Key_Period: ch='.'; break;
//         case Qt::Key_Slash: ch='//'; break;
//         case Qt::Key_0: ch='0'; break;
//        case Qt::Key_1: ch='1'; break;
//        case Qt::Key_2: ch='2'; break;
//        case Qt::Key_3: ch='3'; break;
//        case Qt::Key_4: ch='4'; break;
//        case Qt::Key_5: ch='5'; break;
//        case Qt::Key_6: ch='6'; break;
//        case Qt::Key_8: ch='!'; break;
//        case Qt::Key_9: ch='!'; break;


//         case Qt::Key_Exclam: ch='!'; break;
//         case Qt::Key_Exclam: ch='!'; break;
//         case Qt::Key_Exclam: ch='!'; break;




//    default:
//        break;
//    }
//    return ch;
//}

//"0",/*Qt::Key_0 0x30 */
//"1",/*Qt::Key_1 0x31 */
//"2",/*Qt::Key_2 0x32 */
//"3",/*Qt::Key_3 0x33 */
//"4",/*Qt::Key_4 0x34 */
//"5",/*Qt::Key_5 0x35 */
//"6",/*Qt::Key_6 0x36 */
//"7",/*Qt::Key_7 0x37 */
//"8",/*Qt::Key_8 0x38 */
//"9",/*Qt::Key_9 0x39 */
//":",/*Qt::Key_Colon 0x3a */
//";",/*Qt::Key_Semicolon 0x3b */
//"<",/*Qt::Key_Less 0x3c */
//"=",/*Qt::Key_Equal 0x3d */
//">",/*Qt::Key_Greater 0x3e */
//"?",/*Qt::Key_Question 0x3f */
//"@",/*Qt::Key_At 0x40 */
//"A",/*Qt::Key_A 0x41 */
//"B",/*Qt::Key_B 0x42 */
//"C",/*Qt::Key_C 0x43 */
//"D",/*Qt::Key_D 0x44 */
//"E",/*Qt::Key_E 0x45 */
//"F",/*Qt::Key_F 0x46 */
//"G",/*Qt::Key_G 0x47 */
//"H",/*Qt::Key_H 0x48 */
//"I",/*Qt::Key_I 0x49 */
//"J",/*Qt::Key_J 0x4a */
//"K",/*Qt::Key_K 0x4b */
//"L",/*Qt::Key_L 0x4c */
//"M",/*Qt::Key_M 0x4d */
//"N",/*Qt::Key_N 0x4e */
//"O",/*Qt::Key_O 0x4f */
//"P",/*Qt::Key_P 0x50 */
//"Q",/*Qt::Key_Q 0x51 */
//"R",/*Qt::Key_R 0x52 */
//"S",/*Qt::Key_S 0x53 */
//"T",/*Qt::Key_T 0x54 */
//"U",/*Qt::Key_U 0x55 */
//"V",/*Qt::Key_V 0x56 */
//"W",/*Qt::Key_W 0x57 */
//"X",/*Qt::Key_X 0x58 */
//"Y",/*Qt::Key_Y 0x59 */
//"Z",/*Qt::Key_Z 0x5a */
